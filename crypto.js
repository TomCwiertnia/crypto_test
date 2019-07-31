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
  let spis, temp, temp2;

  const loadData = new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      if (err) {
        throw(err);

      } else {
          console.log('MongoDB conected !')
          const db = client.db('users');
          db.collection('users').find({}).toArray((err, data) => {
            if (err) {
              throw(err);
            }
            console.log('spis wewnatrz funkc:' + JSON.parse(JSON.stringify(data))[0].psw);
            spis = JSON.parse(JSON.stringify(data));
            resolve(spis);
            //process.exit(1);
            client.close();
          });
        }
    })
  })

  loadData.then(
    result => {
      spis = JSON.parse(JSON.stringify(spis));
      console.log('this iS IT???: ' + spis[0].psw);


    },
    error => console.log(err)
  );

  console.log('req.body: ' + req.body.pswLogIn);
  bcrypt.hash(req.body.pswLogIn, saltRounds, (err, hash) =>{
    //console.log('req.body.email:' + req.body.email);
    bcrypt.compare(myPlainTextPassword, hash, (err, res2) =>{
      if (res2) {
        console.log('psw correct!');
        console.log(hash);
        res.send('welcome');
    } else if (!res2) {
        console.log('password incorrect...');
        console.log(hash);
        res.send('NO');
      }
    })
  })
})
