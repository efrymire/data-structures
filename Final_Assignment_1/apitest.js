
var async = require('async');
var apiKey = process.env.GMAKEY;
var links = []

var address1 = [ '122 East 37th Street Basement',
  '30 East 35th Street',
  '350 East 56th Street',
  '619 Lexington Avenue Lower Level Music Rooms',
  '122 East 37th Street Basement',
  '28 East 35th Street',
  '350 East 56th Street ',
  '283 Lexington Avenue 2nd Floor',
  '122 East 37th Street Basement',
  '619 Lexington Avenue Lower Level 2 in The Studio',
  '141 East 43rd Street',
  '122 E 37TH St.',
  '122 East 37th Street',
  '141 East 43rd Street',
  '209 Madison Avenue 2nd Floor',
  '122 East 37th Street  Basement',
  '619 Lexington Avenue Lower Level',
  '240 East 31st Street NY 10016',
  '114 East 35th Street 2nd Floor',
  '230 East 60th Street (Basement) ',
  '244 East 58th Street',
  '619 Lexington Avenue Lower Level',
  '325 Park Avenue',
  '236 E 31st St.',
  '308 East 55th Street',
  '244 East 58th Street',
  '244 East 58th Street Lower Level' ];

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