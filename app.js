const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');   //To create ObjectId
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

//Hack me please
//const url = "mongodb://jesperorb:bunneltan@ds127801.mlab.com:27801/yhjust16";
const url = "mongodb://Skala:pw123@ds135049.mlab.com:35049/mdb";

app.use(bodyParser.urlencoded({
  extended: false
})); 

let db;

//Connect to MongoDB - in our case: mLab
MongoClient.connect(url, (error, database) => {

  if(error) return console.log(error);

  console.log('\n\x1b[34mConnected to database ??\x1b[37m\n');

  db = database; //Save to global variable

  //Start server when connected
  app.listen(port, () => {
    console.log("+---------------------------------------+");
    console.log("|                                       |");
    console.log(`|  [\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} ??  \x1b[37m |`);
    console.log("|                                       |");
    console.log("\x1b[37m+---------------------------------------+");
  });
});


//Get ALL movies, empty query, toArray to convert cursor to Array
//of json-objects
/*
app.get('/movies', (req, res) => {
  db.collection('movies').find({}).toArray((error, results) => {
    res.json(results);
  });
});
*/
// tex i webbläsare: http://localhost:3000/queryFind?title=Gudfadern
app.get('/queryFind', (req, res) => {
  db.collection('movies').find(
  {
    //title : req.headers.title //funkade med Postman om man satte headers till önskad film
    "title" : req.query.title
  }).toArray((error, movies) => {
    res.json(movies)
  });
});

/*
app.get('/findYear', (req , res) => {
   //db.collection('movies').find({ "year" : "1972"})//funkar
  db.collection('movies').find({ "year" : { $gt: "1991", $lt: "1998"}})
  .toArray((error, movies) => {
    res.json(movies);
  })
});
*/
/*
app.get('/findRating', (req,res) => {
  db.collection('movies').find({ "imdbRating" : { $gte: 7.1, $lte: 7.1}})
  .toArray((error, movies) => {
    res.json(movies);
  })
});
*/
/*
app.post('/movies', (req,res) => {

  db.collection('movies').insertOne(
  { 
      title: req.body.title,  //input name = title
      year: req.body.year,//input name = artist
      genres: req.body.genres     //input name = year
    }
    ,(error, result) => {
      res.send('Success!');
    });
});
*/


//req.params.id gets the value from the url, it can be anything
//doesn't have to be the id.
//req.params.id gets the value from the url
//i Postman sätts tex localhost:3000/movies/id-mummer (id på det som ska hämtas)
/*
app.get('/movies/:id', (req,res) => {
  db.collection('movies').findOne(
  { 
      //Have to create a ObjectId from the string in :id
      "_id" : new mongodb.ObjectId(req.params.id)
      //"_id" : new mongodb.ObjectId("5913076df36d282be89376cf") 
    }, (error, result)=> {
      res.json(result);
    });
});
*/

app.delete('/movies/:id', (req,res) => {
  db.collection('movies').deleteOne(
  { 
      //Have to create a ObjectId from the string in :id
      "_id" : new mongodb.ObjectId(req.params.id)
      //"_id" : new mongodb.ObjectId("5913076df36d282be89376cf") 
    }, (error, result)=> {
      res.json(result);
    });
});

//i postman tex localhost:3000/movies/5919aa36b4502308209cf3c0
//och sedan ändra värden body
app.patch('/movies/:id', (req,res) => {
  db.collection('movies').update( 
  { 
    "_id" : new mongodb.ObjectId(req.params.id) 
  },
      //$set is used to choose what to update
      {
        $set: { title: req.body.title, year: req.body.year, genres: req.body.genres }
      }, (error, result) => {
        res.json(result);
      });
});

app.patch('/fixRating', (req,res) => {
  db.collection('movies').update(
  { 
    "imdbRating" : { $gt: 8.9 }
  },
  {
    $set: {"imdbRating" : 7.1}
  }, (error, result) => {
    res.send('Edited!');
  });
});



