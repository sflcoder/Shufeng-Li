/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var http = require('http',);
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://team:team@cluster0-zd7rm.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url,  { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbase = db.db("student");
    var myquery = { address: 'Main Road 989' };
    dbase.collection("newCollection").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});