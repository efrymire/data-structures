// Define the site list and text file arrays using push and concatenate for the right url value

var aaSiteList = [];
for (var x=1; x<11; x++) {
    aaSiteList.push('http://visualizedata.github.io/datastructures/data/m'+ ('0'+x).slice(-2) +'.html');
}

var txtFiles = [];
for (var y=1; y<11; y++) {
    txtFiles.push('/home/ubuntu/workspace/data/m'+ ('0'+y).slice(-2) +'.txt');
}

// Use a function to create the 10 files based on the defined arrays

var request = require('request');
var fs = require('fs');
var i = 0;

function makeFile() {
    request(aaSiteList[i], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(txtFiles[i], body);
            i++;
            
            //tell the program to stop at 10 files
            if (i<11) {
                makeFile();
            }
            else {return;}
            }
        else {console.error('request failed')};
    })
}

// Call the function
makeFile();