'use strict';

const uuidv1 = require('uuid/v1');

var config = require( './config.json' );

var util = require('util');

//var mongoUtils = require('../utilities/mongoUtils')

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Mongo URL

var argv = require('minimist')(process.argv);
var dbhost = argv.dbhost ? argv.dbhost : config.db_host;
const mongourl = config.db_prot+"://"+dbhost+":"
        +config.db_port+"/"+config.db_name

module.exports = {
  canvasFind,
  canvasCreate
};

function canvasFind(req, res) {

  var canvas =[{ 'id': '4711', 'name': 'TestCanvas'}];

  res.json(canvas);
}

function canvasCreate(req, res) {
  var canvas = req.swagger.params.canvas.value;

  console.log("CREATE: ", JSON.stringify(canvas));

  if (!canvas.id) {
    canvas.id = uuidv1();
  }
  // Use connect method to connect to the server
  MongoClient.connect(mongourl, function(err, db) {
    assert.equal(null, err);

    // Get the documents collection
    var collection = db.collection('businessModelCanvas');
    // Insert some documents
    collection.insert( canvas, function(err, result) {
      assert.equal(err, null)
      });
    db.close();
    });
    res.json(canvas);
}
