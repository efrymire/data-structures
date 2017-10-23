var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request'); // npm install request
var async = require('async'); // npm install async

var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var meetings = [];
var groupNames = [];
// var meetingDetails = [];
// var meetingSplit = [];
// var meetingTypeSplit = [];

function parseDataArray() {
    
    // create array of group names
    for (i=1; i<23; i++) {
        groupNames.push(
            $('h4')
            .eq(i+1)
            .text()
            .trim()
            );
    }
    //fs.writeFileSync('group-names.txt', groupNames);
    
    // create JSON of group names
    for (i=1; i<23; i++) {
        var thisGroup = new Object;
        thisGroup.latLong = $('h4')
            .eq(i+1)
            .text()
            .trim()
            );
    }
    
    
    // create array of addresses and details
    for (i=1; i<23; i++) {
        meetings.push(
            $('td')
            .eq(i*3)
            .contents()
            .filter(function() {
                return this.nodeType == 3;
                })
            .eq(2)
            .text()
            .trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            .replace(/,/g,'')
            );
    }

    
    //console.log(meetings)
    
    // // run the same for meeting days
    // for (i=1; i<23; i++) {
    //     meetingDetails.push(
    //         $('td')
    //         .eq((i*3)+1)
    //         .text()
    //         .trim());
    // }
    
    // // clean the objects
    // for (i=1; i<meetingDetails.length; i++) {
    //     meetingSplit.push(meetingDetails[i]
    //         .split('\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    '))
    // }
    
    // console.log(meetingSplit[0][0].split( 'Meeting Type '));
    
    // split for the day
    // for (i=1; i<21; i++) {
    //     meetingTypeSplit.push(meetingSplit[i][0].split(' Meeting Type '))
    //     console.log(meetingTypeSplit);
    // }
    
}

parseData();

function groupNameNotation() {
    var thisMeeting = new Object;
    thisMeeting.latLong = JSON.parse(body)
            .geometry
            .location;
}

var apiKey = 'AIzaSyDKkrhAAXDaYkyoamN8Mof_7DHNYCyLnDs';
var meetingsData = [];

// async.eachSeries(meetings, 

function getAPI(value, callback) {
    
    if (value === '550 West 155th Street 2nd Floor Guild Room') {
        value = '550 West 155th Street' };
    if (value === '178 Bennett Avenue 2nd Floor (Lorenz Library)') {
        value = '178 Bennett Avenue' };
    if (value === '178 Bennett Avenue Kitchen') {
        value = '178 Bennett Avenue' };
    if (value === '189th Street & Bennett Avenue Kitchen') {
        value = '189th Street and Bennett Avenue' };
    
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

}

getAPI() 
    
    // The writeFileSync was returning [object,object] because the 
    // function output couldnt be translated into a text file, so by
    // including JSON.stringify it becomes a JSON string, easily 
    // printed into the text file by writeFileSync
    
fs.writeFileSync('meetingsdata.txt', JSON.stringify(meetingsData));


