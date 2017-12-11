
var async = require('async');
var apiKey = process.env.GMAKEY;
var links = []

var address1 = [ '207 West 96th Street',
  '120 West 69th Street Basement',
  '422 West 57th Street',
  '164 West 74th Street 1st floor 10023',
  '207 West 96th Street Little Room Basement',
  '144 West 90th Street Basement',
  '141 West 73rd Street',
  '4 West 76th Street. Meeting in the gym.',
  '221 West 107th Street Basement',
  '207 West 96th Street Basement Little Room',
  '215 West 82nd Street',
  '601 West 114th Street (2nd Red Door) NY 10025',
  '160 Central Park West',
  '5 West 63rd Street Downstairs in large meeting room.',
  '4 West 76th Street (In the gym)',
  '160 Central Park West Gym basement.',
  '152 West 66th Street',
  '3 West 95th Street Lower Level Auditorium',
  '251 West 80th Street 10024',
  '111 West 71st Street',
  '5 West 63rd Street 1st Floor',
  '5 West 63rd Street',
  '207 West 96th Street Basement Little Room',
  '26 West 84th Street',
  '200 West 97th Street Basement',
  '218 West 108th Street',
  '125 West 104th Street 1st Floor',
  '141 West 73rd Street',
  '236 West 73rd Street  5th Floor',
  '165 West 105th Street Basement',
  '207 West 96th Street',
  '207 West 96th Street Basement Little Room',
  '2504 Broadway  Basement',
  '405 West 114th Street',
  '368 West End Ave 1st floor',
  '225 West 99th Street 1st Floor',
  '251 West 100th Street',
  '207 West 96th Street Basement Little Room',
  '26 West 84th Street',
  '5 West 63rd Street Basement Room D',
  '552 West End Avenue Basement',
  '164 West 74 Street',
  '340 West 85th Street Basement',
  '368 West End Avenue 1st Floor',
  '152 West 71st Street',
  '5 West 63rd Street',
  '131 West 72nd Street 3rd Floor Room #2F',
  '207 West 96th Street Basement Little Room',
  '152 West 71st Street',
  '30 West 68th Street',
  '207 West 96th Street Basement Little Room 10025',
  '263 West 86th Street  1st Floor',
  '306 West 102nd Street 2nd Floor',
  '152 West 71st Street NY 10023',
  '26 West 84th Street',
  '595 Columbus Avenue',
  '306 West 102nd Street 2nd Floor',
  '213 West 82nd Street',
  '152 West 71st Street',
  '152 west 71st street',
  '152 West 71st Street',
  '160 Central Park West Downstairs',
  '207 West 96th Street Basement Little Room' ];

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