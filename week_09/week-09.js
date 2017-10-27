var request = require('request');
const { Client } = require('pg');

// export PHOTON_ID="210023001247343432313031" 
// export PHOTON_TOKEN="92b66f3641ad62b326a719dd48c48cf27788bccc" 
// export AWSRDS_EP="datastructures.cvnlstce0av9.us-east-2.rds.amazonaws.com" 
// export AWSRDS_PW="be4jinxef" 


// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'fototemp';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'ellie';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'sensors';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var ir = JSON.parse(device_json_string).ir;
        var tempC = JSON.parse(device_json_string).temp;

        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensordata VALUES (" + ir + "," + tempC + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);