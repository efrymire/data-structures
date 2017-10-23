var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async

var apiKey = process.env.GMAKEY;
var meetingsData = [];

var addressArray = fs.readFileSync('address-array.txt')

    // the original array was a text string, so with .toString and 
    // .split, the file becomes an array available for async function

        .toString()
        .split(",");

async.eachSeries(addressArray, function(value, callback) {
    // m10 has a few addresses that were not found in the google API 
    // due to extraneous details (like "kitchen"), so I used 'if'  
    // statements to change the value operating in the function to  
    // something that could be picked up by the API
    
    if (value === '550 West 155th Street 2nd Floor Guild Room') {
        value = '550 West 155th Street' };
    if (value === '178 Bennett Avenue 2nd Floor (Lorenz Library)') {
        value = '178 Bennett Avenue' };
    if (value === '178 Bennett Avenue Kitchen') {
        value = '178 Bennett Avenue' };
    if (value === '189th Street & Bennett Avenue Kitchen') {
        value = '189th Street and Bennett Avenue' };
    
    // The remaining code is similar to the starter code, but includes 
    // "New+York+NY" to specify results within New York City
    
    var apiRequest = 
        'https://maps.googleapis.com/maps/api/geocode/json?address=' 
        + value.split(' ').join('+') 
        + 'New+York+NY' 
        + '&key=' 
        + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body)
            .results[0]
            .geometry
            .location;
        thisMeeting.formattedAddress = JSON.parse(body)
            .results[0]
            .formatted_address;
        meetingsData.push(thisMeeting);
    })
    setTimeout(callback, 200);
    
}, function() {
    
    // The writeFileSync was returning [object,object] because the 
    // function output couldnt be translated into a text file, so by
    // including JSON.stringify it becomes a JSON string, easily 
    // printed into the text file by writeFileSync
    
    fs.writeFileSync('meetingsdata.txt', JSON.stringify(meetingsData));
    
});
