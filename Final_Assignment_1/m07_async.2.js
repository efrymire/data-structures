// SECOND HALF OF GROUP 7


// ----------------------- PREP -----------------------
// arrange the variables and environment

var fs = require('fs');
var request = require('request');
var async = require('async');    
var cheerio = require('cheerio');

var apiKey = process.env.GMAKEY;

var locationNames = [];
var address1 = [];
var address2 = [];
var leftCol = [];
var details = [];
var jsonMeetings = [];
var addressData = [];

var content = fs.readFileSync('week_01_data/m07.txt')
var $ = cheerio.load(content);


function jsonNotation() {
    
    var addressData = fs.readFileSync('addressdata.txt');
    var addressDataParsed = JSON.parse(addressData);
    
    for (i=0; i<53; i++) {
        
        var thisLocation = new Object;
        
        thisLocation.groupName = leftCol[i][1];
        thisLocation.address1 = address1[i];
        thisLocation.address2 = address2[i];
        thisLocation.group = 'm07';
        thisLocation.latLong = addressDataParsed[i].latLong;
        thisLocation.notes = leftCol[i][4];
        thisLocation.wheelchair = leftCol[i][5];
        thisLocation.meetings = details[i];
        
        jsonMeetings.push(thisLocation);
    }
console.log(jsonMeetings)
}
    
    
// ----------------------- MONGO -----------------------
// add the compiled json objects to mongo db

setTimeout(function() {
    // var dbName = 'aa_group_meetings';
    // var groupNamesColl = 'group_names'; 
    var meetingsColl = 'meetings';

    request(jsonMeetings, function(error, response, body) {

        // var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
        var url = process.env.ATLAS
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, function(err, db) {
            if (err) { return console.dir(err); }
            var collection = db.collection(meetingsColl);
            collection.insert(jsonMeetings);
            db.close();
            
        });
    });
}, 30000)
