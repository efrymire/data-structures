var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR

var apiKey = process.env.GMAKEY;

var meetingsData = [];
var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) { //takes an array and operates over the elements of the array in order and makes sure that the results sync up with the request
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey; //find all the spaces and replavce them with + and append the API key in the url
    var thisMeeting = new Object; //this is happening within the funciton and is ONLY available within this function and never again, so you're never writing over it again because it acts as though it never existed
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {  //making the request
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;  //parse the JSON response body and take the first element of the array, give me the location of the geometry
        thisMeeting.formattedAddress = JSON.parse(body).results[0].formatted_address;
        meetingsData.push(thisMeeting); //add that location to that object 
    });
    setTimeout(callback, 500); //slows it down to 2 seconds (2thousand milliseconds) because most APIs have a limit to the call frequency
}, function() {
    console.log(meetingsData);
});

//write the array to a file so you have something to send to github