var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var server = app.listen(3000, function(){
  console.log('server listening at :3000');
})
