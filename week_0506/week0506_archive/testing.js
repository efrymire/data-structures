var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var groupNames = [];
var meetingInfo = [];

for (i=1; i<23; i++) {
    var thisGroup = new Object;
    thisGroup.groupName = $('h4')
        .eq(i+1)
        .text()
        .trim();
    groupNames.push(thisGroup);
}

for (i=1; i<23; i++) {
    var thisMeeting = new Object;
    
    thisMeeting.address = $('td')
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
        .replace(/,/g,'');
    
    thisMeeting.details = $('td')
        .eq((i*3)+1)
        .text()
        .trim()
        .split('\n\t\t\t \t\t\t\n                    \t\n                    \t\n\t\t\t\t  \t    ');
        
    meetingInfo.push(thisMeeting);
    }
    console.log(meetingInfo[0].details);
    
for (i=1; i<meetingInfo.length; i++) {
    var thisDetails = new Object;
    thisDetails.day = meetingInfo[0].details[0].split(' Meeting Type ');
    meetingInfo[i].times = thisDetails;
    console.log(meetingInfo[i]);
    }
    
// console.log(groupNames);
// console.log(meetingDetails);


/* more tests

 //for (i=0; i<meetingInfo.length; i++) {
        // var meetingInfoSplit = meetingInfo[0][0].split(' Meeting Type ')
        // var meetingInfoSplit2 = meetingInfoSplit[0].split( ' to ')
        // var meetingInfoSplit3 = meetingInfoSplit2[0].split( ' From ');
    //}
    
    for (i=0; i<meetingInfo.length; i++) {
        for (j=0; j<meetingInfo[i].length; j++) {
            meetingInfoSplit.push(meetingInfo[i][j].split(' Meeting Type '))
        }
    }
    
    for (i=0; i<meetingInfoSplit.length; i++) {
        for (j=0; j<meetingInfoSplit[i].length; j++) {
            meetingInfoSplit2.push(meetingInfoSplit[i][j].split(' to '))}
    }
    
    for (i=0; i<meetingInfoSplit2.length; i++) {
        for (j=0; j<meetingInfoSplit2[i].length; j++) {
            meetingInfoSplit3.push(meetingInfoSplit2[i][j].split(' From '))}
    }

// console.log(groupNames);
// console.log(meetings);
// console.log(meetingInfo);
// console.log(meetingInfoSplit)
// console.log(meetingInfoSplit2)
console.log(meetingInfoSplit3[0])
// console.log(meetingInfoSplit3[0])