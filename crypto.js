var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(express.urlencoded());
app.use(express.json());

// runing server at localhost:3000
var server = app.listen(3300, function(){
  console.log('server listening at :3300 !!');
});

const bcrypt = require('bcrypt');
const saltRounds = 13;
const myPlainTextPassword = 'password123';
const someOtherPlaintextPassword = 'pass123notGood';

app.post('/newuser', (req,res) => {
  console.log('registration process..');
    // dostajemy imie, email, pswLogIn
    // MOngoDV - logIn
    // sprawdzamy czy istnieje email jesli tak to blad
    // jesli nie istnieje to hasujemy i zapisujemy uzytkownika
    // odsylamy do strony logowania
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      if (err) {
        throw(err);
      } else {
          const db = client.db('users');
          //checking if an user with same email is already in the database
          console.log('user email: ' + req.body.email);

          // userExists returns PROMISE
          let userExists = db.collection('users').find({'email': req.body.email}).toArray();
            console.log('TUTAJ : ' + userExists);
          if ( 1 > 0 )

           {
            console.log('account exists');
            console.log('MongoDb anwser: ' + db.collection('users').find({'email': JSON.stringify(req.body.email)}));
            console.log('MongoDb name: ' + db.collection('users').find({'email': req.body.email}).email);
            //res.send('account with that email already exist!');
          } else if (!db.collection('users').find({'email': JSON.stringify(req.body.email)})) {
            console.log('MongoDb anwser: ' + db.collection('users').find({'email': req.body.email}));
            console.log('account does NOT exists - creating new user');
            let hashPsw = bcrypt.hash(req.body.psw, saltRounds, (err, hash) => {
              if(err) {
                throw(err);
              }
            });
            //new user insertion
            db.collections.insertOne({name: req.body.name, email: req.body.email, psw: hashPsw});
          }
          //res.send('New user has been created. Hello ' + req.body.name);
          client.close();

        }
      });
});


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
