
var async = require('async');
var apiKey = process.env.GMAKEY;
var links = []

var address1 = [ '35 East 125 Street 1st Floor Conference Room',
  '223 East 117th Street 1st Floor Dining Room',
  '2126 2nd Avenue 1st Floor',
  '22 East 119th Street  1st Floor Cafeteria' ];

function plus() {
    for (i=0;i<address1.length;i++) {
        
        address1[i] = address1[i].split(' ').join('+')
    }    
}

function linksGen() {
    for (i=0;i<address1.length;i++) {
        
        var apiRequest = 
            'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + address1[i]
            + '+New+York+NY'
            + '&key='
            + apiKey;
            
        links.push(apiRequest)
    }
}

function api() {
    
    async.eachSeries(address1, function(value, callback) {
            
        var apiRequest = 
            'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + value.split(' ').join('+')
            + 'New+York+NY'
            + '&key='
            + apiKey;
            
    console.log(value)
    
    links.push(apiRequest)
    
    })}
    
plus()
linksGen()
    
console.log(links)