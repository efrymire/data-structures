# Information Regarding This Assignment
### Weekly Assignment 5/6, Due October 9 at 4PM

Although this submission may appear somewhat complete, it lacks several key components. I intend to keep working, whether for credit or not, to achieve the intended result. I've outlined my intended approach and challenges below.

#### Intended Approach:
1. Parse and Clean: My first task was to pull the text from m10.txt file, and push the relevant information into 3 arrays: (1) Group Names, (2) Meeting Addresses, (3) Meeting Details - like day, time, and special info.
2. JSON Organization: I wanted to then place the details in the appropriate location in a JSON Notation, ideally looking like this:
    ```js
    // a collection of group names
    {
        "group_name":"Washington Heights"
    }
    // a collection of addresses and associated information
    {
        "address": "715 West 179th Street",
        "details": [
            {
            "day": "Tuesdays",
            "start": "7:30",
            "end": "8:30",
            "type": "O = Open meeting"
            }, 
            {
            "day": "Fridays",
            "start": "7:30",
            "end": "8:30",
            "type": "BB = Big Book meeting "
            }]
    }
    ```
3. Once it was in this style, I would then run the google API and add the formatted address information to the existing JSON address information so it would look like this:
     ```js
    {
        "address": "715 West 179th Street",
        "formatted_address": "715 W 179th St"
        "latLong":
            {
            "lat":40.849431,
            "lng":-73.93840399999999
            }
        "details": [
            {
            "day": "Tuesdays",
            "start": "7:30",
            "end": "8:30",
            "type": "O = Open meeting"
            }, 
            {
            "day": "Fridays",
            "start": "7:30",
            "end": "8:30",
            "type": "BB = Big Book meeting "
            }]
    }
    ```
4. Then I would add this information to Mongo DB and run the query on the db. The key would be that the group_names would refer to at least one location/meeting time. For example, "Washington Heights" has 3 seperate meeting instances in 3 different locations.  
    ```js
    {
        "group_name":"Washington Heights"
        "location":"59dba5b23780a633d84dd20a, 59dba5b23780a633d84dd1ff"
    }
    // first meeting time/place
    {
    "_id": "59dba5b23780a633d84dd20a",
    "address": "715 West 179th Street",
    "formatted_address": "715 W 179th St"
    "latLong":
        {
        "lat":40.849431,
        "lng":-73.93840399999999
        }
    "details": [
        {
        "day": "Tuesdays",
        "start": "7:30",
        "end": "8:30",
        "type": "O = Open meeting"
        }]
    }
    // second meeting time/place
    {
    "_id": "59dba5b23780a633d84dd1ff",
    "address": "189th Street & Bennett Avenue, Kitchen",
    "formatted_address": "189th Street"
    "latLong":
        {
        "lat":42.844431,
        "lng":-70.9369999999
        }
    "details": [
        {
        "day": "Fridays",
        "start": "9:30",
        "end": "10:30",
        "type": "O = Open meeting"
        }]
    }
        
    ```

#### Challenge I: Day, Time, and Special Information 
My first issue arose when I attempted to split the Meeting Details array. After I complete step 1, this array contains a single array for each meeting's clean details, like so:
```js
[ [ 'Thursdays From  12:00 PM to 1:00 PM Meeting Type S = Step meeting ',
    'Fridays From  12:00 PM to 1:00 PM Meeting Type C = Closed Discussion meeting Special Interest Living Sober',
    'Mondays From  12:00 PM to 1:00 PM Meeting Type BB = Big Book meeting ',
    'Tuesdays From  12:00 PM to 1:00 PM Meeting Type B = Beginners meeting ',
    'Wednesdays From  12:00 PM to 1:00 PM Meeting Type C = Closed Discussion meeting' ],
  [ 'Mondays From  10:00 AM to 11:00 AM Meeting Type OD = Open Discussion meeting ',
    'Tuesdays From  10:00 AM to 11:00 AM Meeting Type B = Beginners meeting Special Interest Living Sober',
    'Wednesdays From  10:00 AM to 11:00 AM Meeting Type BB = Big Book meeting ',
    'Thursdays From  10:00 AM to 11:00 AM Meeting Type S = Step meeting ',
    'Fridays From  10:00 AM to 11:00 AM Meeting Type OD = Open Discussion meeting' ],
  [ 'Sundays From  10:00 AM to 11:00 AM Meeting Type S = Step meeting' ],
  [ 'Sundays From  12:00 PM to 1:00 PM Meeting Type O = Open meeting ',
    'Wednesdays From  7:00 PM to 8:00 PM Meeting Type S = Step meeting' ]
```
But once I would ```split() ``` on something like 'Meeting Type' or 'From', it created embedded arrays, like this, for the first meeting instance of the first group:
```js
[ [ [ ['Thursdays' , '12:00 PM'] , '1:00 PM'] , 'S = Step meeting ']]
```
This is where my intended approach broke down -- I wasn't able to repeat this for each meeting instance of each group, and pull the correct information.
Instead, I was able to "hack" and get the right information in the JSON notation for *only the first meeting instance of each group*.

#### Challenge II: Joining the Google API JSON output with the other information
My second issue involved editing the google API starter code from the week 3 assignment. My process involved two different arrays to achieve one JSON object -- both Meeting Addresses and Meeting Details. The code from week 3 would only allow one collection of data to iterate on, so I couldn't bring them together in one function (since my Meeting Details required a for loop). 
I instead tried to write my own for loop with all the information, but this ended up writing them as either (1) seperate objects, (2) in the incorrect order/grouping, or (3) the entire for loop would run 22 times with only one address, then 22 times again for the next address, and so on. 
I think this is just a simple organization of functions, but I wanted to skip this and make sure I could come up with a query. 

#### Challenge III: Mongo DB Referencing
My original intention required the group names to reference the location ID of the multiple places and times in which it meets. I wasn't able to figure out in limited time how to create this refrence in MongoDB -- so I instead just included group_name in the mongo instance. Therefore, each object looks like this:
```js
{
    "group_name":"Washington Heights"
    "address": "715 West 179th Street",
    "details": [
        {
        "day": "Tuesdays",
        "start": "7:30",
        "end": "8:30",
        "type": "O = Open meeting"
        }]
}
```
I ran with this style and created a query with this limited collection of information. 