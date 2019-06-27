/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

//var url='mongodb://foo:foo@ds147668.mlab.com:47668/web_demo';//1.Modify this url with the credentials of your db name and password.
//var url='mongodb+srv://student:student@umkclab-rh4yb.mongodb.net/test?retryWrites=true&w=majority';
var url='mongodb://japoland:CS490!!!!@cs490-shard-00-00-btbrn.mongodb.net:27017,cs490-shard-00-01-btbrn.mongodb.net:27017,cs490-shard-00-02-btbrn.mongodb.net:27017/test?ssl=true&replicaSet=CS490-shard-0&authSource=admin&retryWrites=true&w=majority';
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");
        });
    });
});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book
    MongoClient.connect(url, function(err, db) {
        if (err){
            res.write("Failed, Error connecting to Database");
            res.end();
        }
        deleteDocument(db, req, function() {
            res.write("Successfully deleted");
            res.end();
        });
    });
});

app.get('/update/:toBeUpdated_id', function (req, res) {
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    MongoClient.connect(url, function(err, db) {
        if (err){
            res.write("Failed, Error connecting to Database");
            res.end()
        }
        updateDocument(db, req.query, function() {
            res.write("Successfully Updated");
            res.end();
        })
    })
});


var insertDocument = function(db, data, callback) {
    db.collection('books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var deleteDocument = function(db, data, callback){
    //delete
    db.collection('books').deleteOne({"_id": ObjectID(data.params.toBeDeleted_id)}, function(err, result){
        console.log(data.params);

        if(err)
        {
            res.write("Delete registration Failed, Error while registering");
            res.end();
        }
        console.log("Deleted a document from the books collection. ");
        callback();
    });
};

var updateDocument = function(db, data, callback){
    db.collection('books').updateOne({"_id": ObjectID(data._id)}, {$set: {"ISBN": data.ISBN, "bookName": data.bookName, "authorName": data.authorName}}, function(err, result){
        console.log(data);
    if(err)
        {
            res.write("Update registration Failed, Error while registering");
            res.end();
        }

        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});