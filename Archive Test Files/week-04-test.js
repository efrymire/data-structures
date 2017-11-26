// 2 things: (1) try without string/parse and (2) try to add meetingLocation

var fs = require('fs');
var request = require('request');

var dbName = 'aa_group_meetings'; 
var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings'; 

var meetingsData = ('{"meetingLocation":' + fs.readFileSync('meetingsdata.txt') + '}');

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

/*

var request = require('request');
var fs = require('fs');

var dbName = 'aa_group_meetings'; 
var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings'; 

var meetingsData = {"address":"701 West 168th Street @ Fort Washington Avenue","latLong":{"lat":40.84213949999999,"lng":-73.9422811},"formattedAddress":"W 168th St & Haven Ave, New York, NY 10032, USA"}

request(meetingsData, function(error, response, body) {
    
    // var meetingsDataParsed = JSON.parse(meetingsData);
    
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection(meetingsColl);
        collection.insert(meetingsData.formattedAddress);
        db.close();

    });

});

var meetingsData = fs.readFileSync('meetingsdata.txt').toString();
var meetingsData = {"meetingInfo": [{"address":"701 West 168th Street @ Fort Washington Avenue","latLong":{"lat":40.84213949999999,"lng":-73.9422811},"formattedAddress":"W 168th St & Haven Ave, New York, NY 10032, USA"}]};


*/