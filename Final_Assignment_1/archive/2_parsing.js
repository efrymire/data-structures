var fs = require('fs');
var cheerio = require('cheerio');

// load the m10 text file into a variable, `content`, load `content` into a cheerio object
var content = fs.readFileSync('week_01_data/m10.txt');
var $ = cheerio.load(content);

// create the empty array to be filled with address text
var address = [];
var groupNames=[];
var details = [];
var details2=[];

// use a function to fill the array with the addresses for the contents of every 3rd td node (see i*3 below)
function fillArray() {
    for (i=1; i<23; i++) {
        // by using 'node === 3', the function is limited to only text nodes (not divs, spans, or h4s)
        address.push(
            $('td')
            // .css('style','border-bottom:1px solid #e3e3e3; width:260px')
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
        // by using 'node === 3', the function is limited to only text nodes (not divs, spans, or h4s)
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
}

fillArray();

// console.log(details)
// console.log(groupNames)
// console.log(address)
fs.writeFileSync('address-array.txt', address);


