var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var address = [];

function printArray() {
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
}

printArray();

