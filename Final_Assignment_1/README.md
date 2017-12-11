## Final Assignment 1

### Final URL

http://ec2-18-221-211-66.us-east-2.compute.amazonaws.com:4000/aa

### Assignment Description

*You will expand on weekly assignments one through six to scrape New York's AA 
Meeting List to capture, clean, and store all meetings in Manhattan (zones one 
through ten). The meetings data should be stored in MongoDB and queried using 
the aggregation pipeline. You will use the Google Maps API to display relevant 
meetings as map markers, with Info windows that show all relevant information 
about the meeting(s) at each marker. Here's an example, showing one meeting 
group.*

### Information Regarding This Submission

My code can be broken down by group in the following structure:

* **Prep**: Arrange the variables and environment for the code to run


* **Order**: Use an async function to follow each subsequent function in the correct order


* **Parse**: Parse the data and fill several arrays to gather the right information. 
These arrays include location names, address information, wheelchair and location
notes, meeting group name, and meeting details (day and time).


* **Cleanse**: I then replaced certain values, updated the arrays, and cleansed the data
based on the final output. This often included replacing addresses that were
not obtaining in an api result.


* **Meeting Objects**: I created a function that put the meeting information into the right arrangement
of JSON notation and fixed the time arrangement issues. This was particularly
challenging because they had to remain within the array of the location 
in which all meetings take place. 


* **API**: I then run the address data through the google API


* **JSON Notation**: I compile the meeting details, address information, and other 
relevant information into a JSON object to put into mongo.

* **Mongo**: Connect with the mongo client and insert this specific group. 

### Lessons Learned

I've learned a lot about javascript, functions, variables, and errors through this
assignment. Now that I know what I do, I can see how my own code is flawed. 
If I had the time to update and re-work my code, these are the problems I would fix. 

**Timing Is Everything**: I created a (seemingly) well-working code when I operated
only on my own zone (m10). It worked when I ran it, so I copied the code for all 
other zones, and made the specific changes to each area. However, it wasn't until 
I got to the much larger zones (like m06 and m07) that my code was jumping ahead of 
itself. I thought that my async function would fix this - but it seems
to start a function and move on to the next function, even if the first function isn't completed yet. 
I would often get "unhanded promise rejections" or "cannot read the property 'latLong' of 
undefined". I know these errors too well, and I've learned it is because the next function 
started prior to the earlier functions completion. This was particularly relevant with the 
larger zones, because it took longer to complete the parsing of a larger set of meetings. 
If I were to re-write my code, I would leverage async functions and setTimers more carefully
to ensure that each section completed before starting the next section. Another
option would be splitting my code by my sections (parsing, cleaning, etc.) rather than 
by zone. 

**One Location, Two Addresses**: A side effect of the disastrously dirty data from the initial websites is that 
some locations have slightly varying addresses. For example, "49 Fulton St" is the same
as "49 Fulton St 1st Floor Library". This meant that two pins appear in that location, 
and the groups are not consolidated into the same textbox. If I had time to clean this
code, I would change my "cleaning" process to (1) align all similar addresses, but more
importantly, (2) maintain the room specific details that are often listed. For this version, 
I felt it important to include "library" or "kitchen" when it didn't place the pin in 
another state. Now that I see this issue on the map, I'd re-write my code to solve it.
