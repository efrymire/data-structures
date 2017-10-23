var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var address = [];
var groupNames = [];
var meetingDay = [];
var meetingTime = [];
var meetingType = [];
var meetingSpecInst = [];

function printArray() {
    
    // push addresses into an array
    for (i=1; i<23; i++) {
        address.push(
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
    fs.writeFileSync('address-array.txt', address);
    
    // run same code for the group names
    for (i=1; i<23; i++) {
        groupNames.push(
            $('h4')
            .eq(i+1)
            .text()
            .trim()
            );
    }
    fs.writeFileSync('group-names.txt', groupNames);
    
    // run the same for meeting days
    for (i=1; i<23; i++) {
        meetingDay.push(
            $('td')
            .eq((i*3)+1)
            .filter(function(str) {
                return /\S/.test(str) })
            .text()
            .replace(/(\r\n|\n|\r)/gm,'')
            .trim()
    );}
    fs.writeFileSync('meeting-details.txt', meetingDeets);
}

printArray();
