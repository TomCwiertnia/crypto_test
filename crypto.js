var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
//var MongoClient = require('mongodb').MongoClient;


app.use(express.urlencoded());
app.use(express.json());

// runing server at localhost:3000
var server = app.listen(3300, function(){
  console.log('server listening at :3300');
})

const bcrypt = require('bcrypt');
const saltRounds = 13;
const myPlainTextPassword = 'password123';
const someOtherPlaintextPassword = 'pass123notGood';

app.post('/',(req, res) => {
  bcrypt.hash(req.body.psw1, saltRounds, (err, hash) =>{
    bcrypt.compare(myPlainTextPassword, hash, (err, res) =>{
      if (res) {
        console.log('psw correct!');
        console.log(hash);
      } else if (!res) {
        console.log('password incorrect...');
        console.log(hash);
      }
    })
  })
})
