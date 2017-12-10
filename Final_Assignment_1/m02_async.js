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

var content = fs.readFileSync('week_01_data/m02.txt')
var $ = cheerio.load(content);


// ----------------------- ORDER -----------------------
// run the correct function analysis order on the read content

async function runAnalysis() {
    
    fillArrays();
    cleanseDetails();
    meetingObjects();
    apiMongo();
};

runAnalysis()

// ----------------------- PARSE -----------------------
// parse the data and fill two arrays: (1) the entire left column cell and
// (2) the meeting specific details in the center column cell

function fillArrays() {
    for (i=1; i<29; i++) {
        locationNames.push(
            $('h4').eq(i+1).text().trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            );
    }
    for (i=1; i<29; i++) {
        address1.push(
            $('td').eq(i*3).contents()
            .filter(function() {
                return this.nodeType == 3;
                })
            .eq(2).text().trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            .replace(/,/g,'')
            );
    }
    for (i=1; i<29; i++) {
        address2.push(
            $('td').eq(i*3).contents()
            .filter(function() {
                return this.nodeType == 3;
                })
            .eq(3).text().trim()
            .replace(/\t/g,'')
            .replace(/\n/g,'')
            .replace(/,/g,'')
            );
    }
    for (i=1; i<29; i++) {
        leftCol.push($('td')
            .eq((i*3)).contents().text().trim()
            .replace('\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n                         \n\t\t\t\t\t\t\n                        ',' // ')
            .replace('\n\t\t\t\t\t\t',' // ')
            .replace('\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n                        \n                         \n                        \t',' // ')
            .replace('\n\t\t\t\t  \t    ',' // ')
            .replace('\n\t\t\t\t\t\t',' // ')
            .replace('\n                        \n                         \n\t\t\t\t\t\t\n                        ',' // ')
        );
    }
    for (i=1; i<29; i++) {
        details.push($('td')
            .eq((i*3)+1).contents().text().trim()
            .replace('Sober\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Sober \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Sober\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Sundays','Sober \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Sundays')
            .replace('Bisexual\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Bisexual \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Bisexual\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays','Bisexual \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays')
            .replace('Format\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays','Format \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays')
            .replace('Format\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Format \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Promises\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Promises \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Meditation\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Meditation \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Topic\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Thursdays','Topic \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Thursdays')
            .replace('Topic\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Tuesdays','Topic \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Tuesdays')
            .replace('Topic\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays','Topic \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays')
            .replace('Format\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays','Format \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays')
            .replace('Deaf\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Deaf \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Topic\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Topic \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Welcome\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Welcome \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Men\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Saturdays','Men \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Saturdays')
            .replace('Women\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Women \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Sundays From  8:30 PM to 9:30 PM Meeting Type OD = Open Discussion meeting Special Interest Gay, Lesbian and Bisexual\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays From  8:30 PM to 9:30 PM Meeting Type OD = Open Discussion meeting Special Interest Gay, Lesbian and Bisexual','Sundays From  8:30 PM to 9:30 PM Meeting Type OD = Open Discussion meeting Special Interest Gay, Lesbian and Bisexual \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    Fridays From  8:30 PM to 9:30 PM Meeting Type OD = Open Discussion meeting Special Interest Gay, Lesbian and Bisexual')
            .split(' \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
        );
    }
    
    // console.log(locationNames)
    // console.log(address1)
    // console.log(address2)
    // console.log(leftCol)
    // console.log(details)
    
}

// ----------------------- CLEANSE -----------------------
// clean up the text in the meeting details to (1) allow for an easy split, 
// (2) populate wheelchair info, and (3) populate the street address array

function cleanseDetails() {
    
    for (i in leftCol) {
        
        leftCol[i] = leftCol[i].split(' // ')
        
        if (leftCol[i][5] == 'Wheelchair access') {
            leftCol[i][5] = 'Wheelchair available'
        } else {leftCol[i][5] = 'Wheelchair unavailable'}
        if (leftCol[i][4] == 'Wheelchair access') {
            leftCol[i][5] = 'Wheelchair available'}
        if (leftCol[i][4] == undefined) {
            leftCol[i][4] = 'no notes'}
            
        // address[i] = leftCol[i][2].replace(/,/g,'').trim()
        
        // if (leftCol[i][2] == '(@ 200th Street, behind Dyckman Avenue ) NY 10040') {
            // address[i] = '35 Thayer Street, Basement'}
    }
    
    for (i in details) {
        for (j in details[i]) {
            details[i][j] = details[i][j]
                .replace('days','day')
                .replace(' From ',' // ')
                .replace(' to ',' // ')
                .replace(' Meeting Type ',' // ')
                .replace(' = ',' // ')
                .replace(' Special Interest ',' // ');
        }
    }
    
    for (i in address1) {
    if (address1[i] == '550 West 155th Street 2nd Floor Guild Room') {
        address1[i] = '550 West 155th Street' }
    if (address1[i] == '178 Bennett Avenue 2nd Floor (Lorenz Library)') {
        address1[i] = '178 Bennett Avenue' }
    if (address1[i] == '178 Bennett Avenue Kitchen') {
        address1[i] = '178 Bennett Avenue' }
    if (address1[i] == '189th Street & Bennett Avenue Kitchen') {
        address1[i] = '189th Street and Bennett Avenue' }
    if (address1[i] == '502 West165th Street Basement') {
        address1[i] = '502 West 165th Street' }
    if (address1[i] == '20 Cardinal Hayes Place Enter thru driveway behind Church.') {
        address1[i] = '20 Cardinal Hayes Place' }
    if (address1[i] == '20 Cardinal Hayes Place Enter through driveway behind Church.') {
        address1[i] = '20 Cardinal Hayes Place' }
    if (address1[i] == '273 Bowery Downstairs') {
        address1[i] = '273 Bowery St' }
    }
    
    // console.log(locationNames)
    // console.log(leftCol)
    // console.log(details)
    // console.log(address1)
    // console.log(address2)
    
}


// ----------------------- MEETINGS OBJECTS -----------------------
// place all the meetings in JSON object array so that the array can be added 
// to the final JSON object later

function meetingObjects() {
    for (i=0; i<details.length; i++) {
        details[i] = jsonMeetingNotation(details[i]);
    }
    // console.log(details)

    function jsonMeetingNotation(input) {
        var output=[];
        for (var j in input) {
            var thisMeeting = new Object
            thisMeeting.day = input[j].split(' // ')[0].trim()
            
            // turn start time into 24 hour
            if (input[j].split(' // ')[1].slice(-2) == 'PM') {
                var shour = Number(input[j].split(' // ')[1].slice(-8,-6).trim()) + 12
                var smin = Number(input[j].split(' // ')[1].slice(-5,-2).trim())
                thisMeeting.startH = shour
                thisMeeting.startM = smin
                thisMeeting.start = shour + ':' + smin
            } else {
                var shour = Number(input[j].split(' // ')[1].slice(-8,-6).trim())
                var smin = Number(input[j].split(' // ')[1].slice(-5,-2).trim())
                thisMeeting.startH = shour
                thisMeeting.startM = smin
                thisMeeting.start = shour + ':' + smin
            }
            
            // turn end time into 24 hour
            if (input[j].split(' // ')[2].slice(-2) == 'PM') {
                var ehour = Number(input[j].split(' // ')[2].slice(-8,-6).trim()) + 12
                var emin = Number(input[j].split(' // ')[2].slice(-5,-2).trim())
                thisMeeting.endH = ehour
                thisMeeting.endM = emin
                thisMeeting.end = ehour + ':' + emin
            } else {
                var ehour = Number(input[j].split(' // ')[2].slice(-8,-6).trim())
                var emin = Number(input[j].split(' // ')[2].slice(-5,-2).trim())
                thisMeeting.endH = ehour
                thisMeeting.endM = emin
                thisMeeting.end = ehour + ':' + emin
            }
            
            // input meeting type
            if (input[j].split(' // ')[4] == 'Topic') {
                thisMeeting.type = 'No Meeting Type'
            } else {
                thisMeeting.type = input[j].split(' // ')[4]
            }
            
            if (input[j].split(' // ')[4] == 'Women') {
                thisMeeting.type = 'No Meeting Type'
            } else {
                thisMeeting.type = input[j].split(' // ')[4]
            }
            
            if (input[j].split(' // ')[4] == undefined) {
                thisMeeting.type = 'No Meeting Type'
            } else {
                thisMeeting.type = input[j].split(' // ')[4]
            }
            
            // input special interest
            if (input[j].split(' // ')[5] == undefined) {
                thisMeeting.interest = 'No Special Interest'
            } else {
                thisMeeting.interest = input[j].split(' // ')[5]
            }
            
            output.push(thisMeeting);
        }
    return output;
    }
}


// ----------------------- LOCATIONS API -----------------------
// get the location details through the google API

function apiMongo() {
    
    async.eachSeries(address1, function(value, callback) {
            
        var apiRequest = 
            'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + value.split(' ').join('+')
            + 'New+York+NY'
            + '&key='
            + apiKey;
            
        // console.log(apiRequest)
        
        var thisMeeting = new Object;
        
        thisMeeting.address1 = value;
        
        request(apiRequest, function(err, resp, body) {
            if (err) {throw err;}
            thisMeeting.latLong = JSON.parse(body)
                .results[0]
                .geometry
                .location;
            thisMeeting.formattedAddress = JSON.parse(body)
                .results[0]
                .formatted_address;
            
            addressData.push(thisMeeting);
        });
        setTimeout(callback, 200);
    }, 
    
    // ----------------------- JSON NOTATION -----------------------
    // create the final JSON notation with meeting array, location, 
    // and other details
    
    function() {
        
        // console.log(addressData);
    
        for (i=0; i<addressData.length; i++) {
            
            var thisLocation = new Object;
            
            thisLocation.groupName = leftCol[i][1];
            thisLocation.address1 = address1[i];
            thisLocation.address2 = address2[i];
            thisLocation.group = 'm02';
            thisLocation.latLong = addressData[i].latLong;
            thisLocation.notes = leftCol[i][4];
            thisLocation.wheelchair = leftCol[i][5];
            thisLocation.meetings = details[i];
            
            jsonMeetings.push(thisLocation);
        }
        console.log(jsonMeetings)
    },
    
    // ----------------------- MONGO -----------------------
    // add the compiled json objects to mongo db
    
    setTimeout(function() {
        var dbName = 'aa_group_meetings';
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
)}
