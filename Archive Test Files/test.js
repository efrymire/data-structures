/*
Full starter code

// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// print project titles
$('.project .title').each(function(i, elem) {
    console.log($(elem).text());
});

table[2] - 0,1,2
tr[1-22]
cell[0]
childNodes [6]

*/

var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('m10.txt');
var $ = cheerio.load(content);

var address = [];

function fillArray() {
    for (i=2; i<10; i++) {
        address.push = $('td').eq(3).first().contents().filter(function() {
            return this.nodeType == 3;
        }).text().trim();
    console.log(address)
    }
}

fillArray();

// a = [1,2,3,4,5];
// var str = address.toString();
// console.log(str);
// var trimmed = str.replace('\t','');
// console.log(trimmed);

// var a = $('td').eq(12).first().contents().filter(function() {
// return this.nodeType == 3;
// }).text().trim();

// console.log(a);


// var address = [];

// function fillArray() {
//     for (i=0; i<4; i++) {
//         address.push = $('td').eq(i).first().contents().filter(function() {
//         return this.nodeType == 3;
//         }).text().trim();
//     }
//     console.log(address)
// }

// fillArray();