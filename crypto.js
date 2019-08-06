var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/'));

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

  var userName = req.body.nameR,
      userEmail = req.body.email,
      userPsw = req.body.psw;

  console.log('login process...');

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('users');

    var checkPsw = () => {
      return new Promise((resolve, reject) => {
        db
          .collection('users')
          .find({email: userEmail})
          .toArray(function(err,data) {
            err
              ? reject(err)
              : resolve(data[0]);
          })
      })
    }
    var callCheckPsw = async () => {
      var checkPswRes = await (checkPsw());
      return checkPswRes;
    }
    callCheckPsw().then(function(checkPswRes) {
      if(checkPswRes == undefined) {
        console.log('user does not exist');
        res.render('nouser.ejs');
      }
    if (callCheckPsw.psw = bcrypt.hash(userPsw, 10)) {
      res.render('map.ejs');
      console.log('login data accepted');
    };
    })
  })
})

app.get('/ejs', (req, res)=>{
  app.use(express.static(__dirname + '/'));
  res.render('index.ejs');
});

app.post('/newuser', (req,res) => {
  //let userExists;

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

            res.render('index2.ejs');
            //res.json(result);
            //res.redirect('/welcome1.html');
          }
          console.log('result:' + result);
          res.render('index3.ejs');
          //res.end();
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

// ==========================================================
//
//                     CZESC Z Map
//
// ==========================================================

//var express = require('express');
//var app = express();
var fs = require('fs');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

// enabling remote access to 'something else' ... ;]
app.use(cors());

//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

// creating server : 5000
/*
var server = app.listen(5000, function(){
  console.log('server Started and running ...!')
});
*/

app.post('/submit-data', function(req, res){
  console.log('submitting data...');
  fs.writeFile("test", JSON.stringify(req.body), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('new point was succesfully saved to file!');
  })
  //Sumbitting new point data to Mongo db
  /*
  MongoClient.connect('mongodb://localhost:27017/mfk', function(err, db){
    var dbo = db.db('mfk');
    if (err) {
      throw err;
    } else {
      console.log('submitting data Mongo connection success');
    }
    let queryName = JSON.parse(JSON.stringify(req.body)).name;
    if (dbo.collection('mfkCollection').find({name: queryName.toString()}) == true) {
      console.log('record already exists !');

      console.log('submit - db.closed(). Record NOT added');
    } else {
      dbo.collection('mfkCollection').insertOne(req.body);

      console.log('submit - db.closed()');
    }
  })
  */
});

// Update Mongodb with point state CHANGE
app.post('/update-json', function(req, res){
  console.log('server says: updating JSON is here .. ');

  let updateRecord = JSON.parse(JSON.stringify(req.body));
  let fileContent;

  fileContent = fs.readFile('test', 'utf8', function(err, content){

      // looking for updated record
      fileContent = JSON.parse(content);
      //console.log('fileContent: ' + fileContent);
      //console.log('updatedRecord:' + updateRecord.name);
      //console.log('filecontetn 1 name:' + fileContent[0].name);
      for (i=0; i<fileContent.length; i++) {
        console.log('i:' + i + 'fileContent:' + fileContent[i].name +' | updateRecord ' + updateRecord.name);
        if (fileContent[i].name == updateRecord.name) {
          fileContent[i].state = updateRecord.state;
        } else { }
      }
      fs.writeFile('test', JSON.stringify(fileContent), function(err){
        if (err) {
          console.log('error saving updated point to file...');
        }
      });
  })

  /*
  MongoClient.connect('mongodb://localhost:27017/mfk',{useNewUrlParser: true}, function(err, db){
    let updateRecord = JSON.parse(JSON.stringify(req.body));
    var dbo = db.db('mfk');
    if (err) {
      throw err;
    } else {
      console.log('update-connected to db!');
    }
    dbo.collection('mfkCollection').updateOne({name: updateRecord.name}, {$set: {state: updateRecord.state}},  function(err, result){
      if (err)
        console.log('Error');
      else
        console.log('update result:' + result);
        console.log(updateRecord.name);
        console.log(updateRecord.state);
        console.log('Success');
    });
  })
  MongoClient.close();
  */
});

app.get('/get-db', function(err, res){
  console.log('get-db connected !');
  var data;
  // Reading Mongo Db
  /*
  MongoClient.connect('mongodb://localhost:27017/mfk', {useNewUrlParser: true}, function(err, db){

    if (err) {
      throw err;
    } else {
      console.log('getting db - connected ... ');
    }
    var dbo = db.db('mfk');

    dbo.collection('mfkCollection').find({}).toArray(function(err, result){
      if (err) throw err;
      res.send(result);
    });
  })
  */

  // reading Db from file
  fs.readFile('test', 'utf8', function(err, content) {
    //let temp = '[' + content + ']';
      res.send(content);
  });
  console.log('reading file DONE..');
})
/*
app.post('/load-db', function(req, res){
  MongoClient.connect('mongodb://localhost:27017/mfk', {useNewUrlParser: true}, function(err, db){
    //let loadedRecord = JSON.stringify(req.body);
    if (err) {
      throw err;
    } else {
      console.log('load-db connected to db!');
      console.log(typeof(req.body));
    }
    var dbo = db.db('mfk');
    dbo.collection('mfkCollection').insert(req.body);
  })
  MongoClient.close();
})
*/
/*
update w bazie danych mongodb
db.people.update(
   { name: "Andy" },
   {
      name: "Andy",
      rating: 1,
      score: 1
   },
   { upsert: true }
)
*/
//})
/*
- wskazać konkretny port na którym jest server Node, tutaj :5000
- jako default akcja POST zwraca reakcje servera do tego samego okna,
  zeby była niewidoczna tworzymy ukryta IFRAME i tam wysylamy odpowiedz z serwera.
  Tam tez prawdopodobnie bedzie mozna zczytać lokalizacje plikow i wrzucic je na mape ?
  Takie rozwiążanie przy wiekszej ilości punktow jest raczej nie do przyjecia ?

*/
