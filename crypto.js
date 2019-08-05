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

app.post('/login', (req,res)=>{
  // login into Mongo:
  // check user email and compare psw
  // possibilities:
  // no user with such email
  // psw NOT correct - back to login page with information about wrong pswHash
  // correct psw - LOAD map
})

app.post('/newuser', (req,res) => {
  let userExists;

  console.log('registration process..');
    // dostajemy imie, email, pswLogIn
    // MOngoDV - logIn
    // sprawdzamy czy istnieje email jesli tak to blad
    // jesli nie istnieje to hasujemy i zapisujemy uzytkownika
    // odsylamy do strony logowania

    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      const db = client.db('users');
      //chceck if user with that email exists in DB
      var checkUser = () => {
        return new Promise ((resolve, reject)=> {
          db
            .collection('users')
            .find({email: req.body.email})
            .toArray(function(err,data) {
              err
                ? reject(err)
                : resolve(data[0]);
              });
            });
          }

          var callcheckMyUser = async () => {
            var result = await (checkUser());
            return result;
          }

          //when have answer if user exists and it does not then create new one with password hashed
          callcheckMyUser().then(function(result) {
            if (result == undefined) {
              //console.log('user NOT exists - creating new one');
              var crypt = () => {
                //crypt taking time
                return new Promise ((resolve,reject)=> {
                    let pswHash = bcrypt.hash(req.body.psw, 10, function(err, hash) {
                      err
                        ? resolve(err)
                        : resolve(hash)
                    });
                });
              }

              var callCrypt = async () => {
                var result2 = await (crypt());
                return result2;
              }
              //when DOne hasing - save useres data with hashed psw to the MongoDB
              callCrypt().then(function(result2) {
                db
                  .collection('users')
                  .insertOne({name: req.body.nameR, email: req.body.email, psw: result2});
                  console.log("hash: " + result2);
              });
              console.log('result:' + result);
              res.end();
              //res.json(result);
              //res.redirect('/welcome1.html');
            }
            console.log('result:' + result);
            res.end();
        });
    }); //end of mongoClient.connect
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
  });

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
});
