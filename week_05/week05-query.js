var fs = require('fs');

var dbName = 'aa_group_meetings'; 
var groupNamesColl = 'group_names'; 
var meetingsColl = 'meetings'; 

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(meetingsColl);
    var my_query = [
       { $match : { $and: [{"day": "Tuesdays"} , { $or: [{"start":"7:30"}, {"start":"8:00"}, {"start":"9:00"}, {"start":"9:30"}, {"start":"10:00"}, {"start":"10:30"}, {"start":"11:00"}, {"start":"11:30"} 
       ] } ] } } ];
    
    collection.aggregate(my_query).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

});