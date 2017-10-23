var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var groupNames = [];
var meetings = [];
var meetingInfo = [];
var jsonMeetings = [];
var jsonGroupNames = [];

// -------- parse the data into their own arrays --------

function parseDataArray() {

    // push group names into an array
    for (i=0; i<22; i++) {
        groupNames.push(
            $('h4')
            .eq(i+1)
            .text()
            .trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            );
    }

    // push addresses into an array
    for (i=0; i<22; i++) {
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
    
    /* orig
    
    // push meeting info into an array
    for (i=0; i<22; i++) {
        meetingInfo.push(
            $('td')
            .eq((i*3)+1)
            .text()
            .trim()
            .split('\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            );
    }
    
    */
    
    // push meeting info into an array
    for (i=0; i<1; i++) {
        meetingInfo.push(
            $('tr')
            .eq(i+4)
            .children('td')
            .nodeValue
            // .replace(/\t/g,'')
            // .replace(/\n/g,'')
            // .replace(/,/g,'')
            // .split()
            );
        // meetingInfo.push(
        //     $('tr')
        //     .eq(i+4)
        //     .children('td').eq(1).html()
        //     // .replace(/\t/g,'')
        //     // .replace(/\n/g,'')
        //     // .replace(/,/g,'')
        //     .split(' \n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    <b>')
        //     );
    }
    
    console.log(meetingInfo)
    fs.writeFileSync('meetinginfotest.txt', meetingInfo)
}

parseDataArray();



/*

// ------------- take the arrays and put them in JSON notiation ---------

function jsonNotation() {
    
    for (i=0; i<meetings.length; i++) {
        
        var thisMeeting = new Object;
        
        thisMeeting.groupName = groupNames[i]
        thisMeeting.address = meetings[i];
        thisMeeting.day = meetingInfo[i][0].split(' ')[0];
        thisMeeting.start = meetingInfo[i][0].split(' ')[3];
        thisMeeting.end = meetingInfo[i][0].split(' ')[6];
        thisMeeting.type = meetingInfo[i][0].split(' Meeting Type ')[1];
        
        jsonMeetings.push(thisMeeting);
    }
    
    for (i=0; i<groupNames.length; i++) {
        
        var thisName = new Object;
        
        thisName.groupName = groupNames[i];
        
        jsonGroupNames.push(thisName);
    }
    
// fs.writeFileSync('group_names.txt', JSON.stringify(jsonGroupNames));
// fs.writeFileSync('meeting_details.txt', JSON.stringify(jsonMeetings));

}

jsonNotation();

// ------------- add to mongo -------------

var dbName = 'aa_group_meetings'; 
var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings'; 

// add group names first

var nameData = ('{"meetingNames":' + JSON.stringify(jsonGroupNames) + '}');

request(nameData, function(error, response, body) {
    
    var meetingsNamesParsed = JSON.parse(nameData);
    
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection(groupNamesColl);
        collection.insert(meetingsNamesParsed.meetingNames);
        db.close();

    });

});

// then add meeting details

var meetingsData = ('{"meetingDetails":' + JSON.stringify(jsonMeetings) + '}');

request(meetingsData, function(error, response, body) {
    
    var meetingsDataParsed = JSON.parse(meetingsData);
    
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection(meetingsColl);
        collection.insert(meetingsDataParsed.meetingDetails);
        db.close();

    });

});

*/