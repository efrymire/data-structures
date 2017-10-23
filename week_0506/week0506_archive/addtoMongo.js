var fs = require('fs');
var request = require('request');

var dbName = 'aa_group_meetings'; 
var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings'; 

// I chose a denormalized data model with one collection for "group_names" and 
// one collection for "meetings". The information in "group_names" collection 
// (ex: "A Better Way") corresponds to meeting details (address, times, and  
// special information) listed in "meeting" collection. I did this because there 
// is a clear one-to-one connection between meeting locatons, times, and details, 
// but there is sometimes more than one location for a particular group name.

var meetingsData = ('{"meetingdetails":' + jsonMeetings + '}');

// In order for the JSON meeting details to be pulled, each JSON object
// needed to be within a higher object. I concatenated '{"meetingLocation:"' to  
// the start of the meetingsdata.txt file, so all the location information can 
// be pulled into the database.

request(meetingsData, function(error, response, body) {
    
    var meetingsDataParsed = JSON.parse(meetingsData);
    
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection(meetingsColl);
        collection.insert(meetingsDataParsed.meetingLocation);
        db.close();

    });

});