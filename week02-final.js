var fs = require('fs');
var cheerio = require('cheerio');

// load the m10 text file into a variable, `content`, load `content` into a cheerio object
var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

// create the empty array to be filled with address text
var address = [];

// use a function to fill the array with the addresses for the contents of every 3rd td node (see i*3 below)
function fillArray() {
    for (i=1; i<23; i++) {
        // by using 'node === 3', the function is limited to only text nodes (not divs, spans, or h4s)
        address.push = $('td').eq(i*3).contents().filter(function() {
            return this.nodeType == 3;
        }).eq(2).text().trim().replace(/\t/g,'').replace(/\n/g,'');
    console.log(address);
    }
}

fillArray();


