//initialize the express framework
const express = require('express')
//express setup
const app = express();
const http = require('http');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
// var mongoose = require('mongoose')
const Favorite = require('./db.js')
app.use(bodyParser())
app.use(express.static('./client'));
app.get('/api/brewery', function(req, res){
  console.log("this is our query", req.query.brewery);
  // //get rid of any spaces
  var brewery = req.query.brewery.replace(/\s/g, ' ');
  var url = {
    host:"http://api.brewerydb.com/v2/search?q="
    + brewery +
    "&type=brewery&key=fac5a6275ee18b2edce889344e63c2e9"
  };
  //set a get request on the url provided above
  http.get(url.host, function(response){
    var bodyChunks = "";
    response.on('data', function(chunk){
      bodyChunks += chunk;
    })
    .on('end', function(){
      res.send(bodyChunks);
    });
  });
})
app.post('/Favorites', function(req, res){
  console.log("in post line 34");
  Favorite.findOne({favorites: req.body.brewery}, function(err, data){
    if(data === null) {
      return Favorite.create({
        brewery: req.body.brewery
      })
    }
  })
  .then(function(result){
    res.status(200).send(result)
  })
  .catch(function(err){
    res.status(404).send(err)
  })
})
app.get('/Favorites', function(req, res){
  console.log("line 49 get");
  Favorite.find({}, function(err, data){
    if(err){
      console.log("error in get", err);
    }
  })
  .then(function(result){
    res.status(200).send(result)
  })
  // .catch(function(err){
  //   res.status(400).send(err)
  // })
})

app.set("port", port)
app.listen(port)
console.log(`server listening on port ${port}`);
