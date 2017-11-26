
// ----------------------- Prep -----------------------

var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var apiKey = process.env.GMAKEY;

var address = [];
var details = [];
var groupNames = [];
var jsonMeetings = [];
var jsonGroupNames = [];

var content = fs.readFileSync('week_01_data/m10.txt');
var $ = cheerio.load(content);



// ----------------------- ASYNC -----------------------

async function runOrder() {
    fillArray();
    apiFormat()
    jsonNotation();
}

runOrder()

// ----------------------- Parse -----------------------


function fillArray() {
    for (i=1; i<23; i++) {
        address.push(
            $('td')
            .eq((i*3))
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
    for (i=1; i<23; i++) {
        groupNames.push(
            $('h4')
            .eq(i+1)
            .text()
            .trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            );
    }
    for (i=1; i<23; i++) {
        details.push(
            $('td')
            .eq((i*3)+1)
            .contents()
            .filter(function() {
                return this.nodeType == 3;
                })
            // .eq(2)
            .text()
            .trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            .replace(/,/g,'')
            // .replace(/  /g,',')
            // .split('                                                  ')
            .split('                                                 ')
        );
    }
    
    // fs.writeFileSync('address-array.txt', address);
}

// ----------------------- FORMAT -----------------------

// var addressArray = fs.readFileSync('address-array.txt')
//         .toString()
//         .split(",");

// console.log(addressArray)

function apiFormat() {

    var meetingsData = [];
    
    async.eachSeries(address, function(value, callback) {
    
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
            thisMeeting.lat = JSON.parse(body)
                .results[0]
                .geometry
                .location
                .lat;
            thisMeeting.long = JSON.parse(body)
                .results[0]
                .geometry
                .location
                .lng;
            thisMeeting.formattedAddress = JSON.parse(body)
                .results[0]
                .formatted_address;
            
            meetingsData.push(thisMeeting);
        })
        setTimeout(callback, 200);
    
    // console.log(meetingsData)
    
    }
    
    , function() {
        
        fs.writeFileSync('meetingsdata.txt', JSON.stringify(meetingsData));
        
    });
    
}


// ----------------------- JSON -----------------------

function jsonNotation() {
    
    var meetingsData = fs.readFileSync('meetingsdata.txt');
    var meetingsDataParsed = JSON.parse(meetingsData);
    
    for (i=0; i<22; i++) {
        
        var thisMeeting = new Object;
        
        thisMeeting.groupName = groupNames[i];
        thisMeeting.address = meetingsDataParsed[i].formattedAddress;
        thisMeeting.lat = meetingsDataParsed[i].lat;
        thisMeeting.long = meetingsDataParsed[i].long;
        thisMeeting.details = details[i];
        
        jsonMeetings.push(thisMeeting);
    }
    
    // for (i=0; i<groupNames.length; i++) {
        
    //     var thisName = new Object;
    //     thisName.groupName = groupNames[i];
    //     jsonGroupNames.push(thisName);
    // }
    
// fs.writeFileSync('group_names.txt', JSON.stringify(jsonGroupNames));
// fs.writeFileSync('meeting_details.txt', JSON.stringify(jsonMeetings));

// console.log(groupNames)
// console.log(meetingsDataParsed)
// console.log(jsonMeetings)

}

// ----------------------- MONGO -----------------------

var dbName = 'aa_group_meetings'; 
// var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings';

// var meetingsData = ('{"meetingLocation":' + fs.readFileSync('meeting_details.txt') + '}');
// var meetingsData = fs.readFileSync('meeting_details.txt');

request(jsonMeetings, function(error, response, body) {
    
    // var meetingsDataParsed = JSON.parse(meetingsData);
    
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection(meetingsColl);
        collection.insert(jsonMeetings);
        db.close();

    });

});