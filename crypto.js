var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

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

app.post('/cryptin', (req, res) => {

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      throw err;
    } else {
      console.log('MongoDB conected !')
      const db = client.db('mfk');
      client.close();
    }
  })
  console.log('req.body: ' + req.body.pswLogIn);
  bcrypt.hash(req.body.pswLogIn, saltRounds, (err, hash) =>{
    //console.log('req.body.email:' + req.body.email);
    bcrypt.compare(myPlainTextPassword, hash, (err, res2) =>{
      if (res2) {
        console.log('psw correct!');
        console.log(hash);

      } else if (!res2) {
        console.log('password incorrect...');
        console.log(hash);
      }
    })
  })
})
