// Define the site list and text file arrays using push and concatenate for the right url value

var aaSiteList = [];
for (var x=1; x<11; x++) {
    aaSiteList.push('http://visualizedata.github.io/datastructures/data/m'+ ('0'+x).slice(-2) +'.html');
}

var txtFiles = [];
for (var y=1; y<11; y++) {
    txtFiles.push('/home/ubuntu/workspace/data/m'+ ('0'+y).slice(-2) +'.txt');
}

// loop within a loop to create the 10 files based on the arrays

var request = require('request');
var fs = require('fs');

for (var i=0; i<aaSiteList.length; i++) {
   request(aaSiteList[i], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            for (var j=0; j<txtFiles.length; j++) {
                fs.writeFileSync(txtFiles[j], body);
            }
        }
        else {console.error('request failed')}
    })
}