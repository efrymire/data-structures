
// ----------------------- Prep -----------------------

var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var apiKey = process.env.GMAKEY;


var leftCol = [];
var groupNames = [];
var address = [];
var times = [];
var details = [];
var meetingType = [];
var endTimes = [];
var startTimes = [];
var jsonMeetings = [];
var jsonGroupNames = [];
var addressData = [];
var addressDataParsed = [];
var meetingInfo = [];
var jsonDetails = [];

var output = [];

var content = fs.readFileSync('week_01_data/m10.txt');
var $ = cheerio.load(content);



// ----------------------- ASYNC -----------------------

async function runOrder() {
    fillArray();
    detailsFix();
    // jsonTest();
    loop()
    apiFormat();
    jsonNotation();
};

runOrder();

// ----------------------- Parse -----------------------


function fillArray() {
    for (i=1; i<23; i++) {
        leftCol.push(
        $('td')
            .eq((i*3))
            .contents()
            .text()
            .trim()
            .replace('\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n                         \n\t\t\t\t\t\t\n                        ',' // ')
            .replace('\n\t\t\t\t\t\t',' // ')
            .replace('\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n                        \n                         \n                        \t',' // ')
            .replace('\n\t\t\t\t  \t    ',' // ')
            .replace('\n\t\t\t\t\t\t',' // ')
            .replace('\n                        \n                         \n\t\t\t\t\t\t\n                        ',' // ')
            );
    }
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
        details.push(
        $('td')
            .eq((i*3)+1)
            .contents()
            .text()
            .trim()
            .replace('Sober\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Sober \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .replace('Bisexual\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ','Bisexual \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            .split(' \n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ')
            );
    }
    
    // console.log(leftCol);
    // console.log(address);
    // console.log(details);
    // console.log(startTimes);
    // console.log(endTimes);
    // console.log(meetingType)

}

// ----------------------- DETAILS FIX -----------------------

function detailsFix() {

    for (i in leftCol) {
        leftCol[i] = leftCol[i].split(' // ')
        
        if (leftCol[i][5] == 'Wheelchair access') {
            leftCol[i][5] = 'Wheelchair available'
        } else {
            leftCol[i][5] = 'Wheelchair unavailable'
        }
        
        if (leftCol[i][4] == 'Wheelchair access') {
            leftCol[i][5] = 'Wheelchair available'
        }
        
        if (leftCol[i][4] == undefined) {
            leftCol[i][4] = 'no notes'
        }
    }
    
    for (i in details) {
        for (j in details[i]) {
            details[i][j] = details[i][j]
                .replace(' From ',' // ')
                .replace(' to ',' // ')
                .replace(' Meeting Type ',' // ')
                .replace(' Special Interest ',' // ')
        }
    }
    
    // console.log(details[0])
    // console.log(details[1])

}


// ----------------------- DETAILS FIX 2 -----------------------

// function jsonTest() {
    
//     for (i=0; i<22; i++) {
        
//         var thisDetail = new Object;
        
//         // for (j in details[i]) {
//         //     thisDetail.meeting = details[i][j];
//         //     thisDetail.meeting = details[i][j+1];
//         //     jsonDetails.push(thisDetail);
//         //     j++;
//         // }
        
//         thisDetail.meeting1 = details[i][0];
//         thisDetail.meeting2 = details[i][1];
//         thisDetail.meeting3 = details[i][2];
//         thisDetail.meeting4 = details[i][3];
        
//         // if (details[i][1] =! undefined) {
//         //     thisDetail.meeting2 = details[i][1];
//         // } else {return;}
        
        
//         jsonDetails.push(thisDetail);
        
        
//         // thisDetail.meeting1 = details[i][0].split(' // ')
//         // thisDetail.meeting2 = details[i][1].split(' // ')
//         // thisDetail.meeting3 = details[i][2].split(' // ')
//         // thisDetail.meeting4 = details[i][3].split(' // ')
        
        
//     }
    
//     for (i in details) {
        
        
        
//     }
    
//     console.log(jsonDetails)
    
// };

function loop() {
    for (i=0; i<details.length; i++) {
        details[i] = jsonMeetingNotation(details[i]);
    }
    
    console.log(details)
    
    function jsonMeetingNotation(input) {
        var output=[];
        for (var j in input) {
            var thisMeeting = new Object
            thisMeeting.day = input[j].split(' // ')[0]
            thisMeeting.start = input[j].split(' // ')[1]
            thisMeeting.end = input[j].split(' // ')[2]
            thisMeeting.type = input[j].split(' // ')[3]
            thisMeeting.interest = input[j].split(' // ')[4]
            output.push(thisMeeting);
        }
    return output;
    // console.log(output);
    }
    
    function formatTimes(meetingsInfo) {
    
        for (var j in meetingsInfo) {
            var thisMeetingInfo = new Object;
            
            // organize information in an object
            thisMeetingInfo.day = meetingsInfo[j].slice(' // ').trim().slice(0, -1);
            // thisMeetingInfo.time = meetingsInfo[j].slice(fromIndex + 4, meetingIndex).trim();
            // thisMeetingInfo.type = meetingsInfo[j].slice(typeIndex + 5, typeIndex + 7);
            // if (meetingsInfo[j].includes('Interest')) {
            //     thisMeetingInfo.type = meetingsInfo[j].slice(typeIndex + 9, specialIndex).trim();
            //     thisMeetingInfo.specialInterest = meetingsInfo[j].slice(interestIndex + 8, meetingsInfo[j].length).trim();
            // }
            // else {
            //     thisMeetingInfo.type = meetingsInfo[j].slice(typeIndex + 9, meetingsInfo[j].length).trim();
            // }
            
            // add completed object to array
            output.push(thisMeetingInfo);
        }
    return output;
}
    
}


// ----------------------- FORMAT -----------------------

function apiFormat() {
    
    async.eachSeries(address, function(value, callback) {
    
        if (value === '550 West 155th Street 2nd Floor Guild Room') {
            value = '550 West 155th Street' }
        if (value === '178 Bennett Avenue 2nd Floor (Lorenz Library)') {
            value = '178 Bennett Avenue' }
        if (value === '178 Bennett Avenue Kitchen') {
            value = '178 Bennett Avenue' }
        if (value === '189th Street & Bennett Avenue Kitchen') {
            value = '189th Street and Bennett Avenue' }
        
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
            
            addressData.push(thisMeeting);
        });
        setTimeout(callback, 200);
    
    }
    
    , function() {
        
        fs.writeFileSync('addressdata.txt', JSON.stringify(addressData));
        
    });
    
}


// ----------------------- JSON -----------------------

function jsonNotation() {
    
    var addressData = fs.readFileSync('addressdata.txt');
    var addressDataParsed = JSON.parse(addressData);
    
    for (i=0; i<22; i++) {
        
        var thisLocation = new Object;
        
        thisLocation.groupName = leftCol[i][1];
        thisLocation.address = address[i];
        thisLocation.lat = addressDataParsed[i].lat;
        thisLocation.long = addressDataParsed[i].long;
        thisLocation.notes = leftCol[i][4];
        thisLocation.wheelchair = leftCol[i][5];
        thisLocation.meetings = details[i];
        
        // for (j in details[i])
        //     thisMeeting.day = details[i][j][0]
        //     thisMeeting.start = details[i][j][1]
        
        // thisMeeting.day = details[i][0].split(' // ')[0].trim();
        // thisMeeting.start = details[i][0].split(' // ')[1].trim();
        // thisMeeting.end = details[i][0].split(' // ')[2];
        // thisMeeting.type = details[i][0].split(' // ')[3];
        // thisMeeting.interest = details[i][0].split(' // ')[4];
        
        jsonMeetings.push(thisLocation);
    }
    
    // for (i=0; i<groupNames.length; i++) {
        
    //     var thisName = new Object;
    //     thisName.groupName = groupNames[i];
    //     jsonGroupNames.push(thisName);
    // }

// console.log(groupNames)
// console.log(meetingsDataParsed)
// console.log(jsonMeetings)

}
