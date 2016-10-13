//initialize the express framework
const express = require('express')
//express setup
const app = express();
const http = require('http');
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
// var mongoose = require('mongoose')
const db = require('./db.js')

app.use(express.static('./client'));
app.get('/api/brewery', function(req, res){
  console.log('This is working') //This end point is working!
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
app.set("port", port)
app.listen(port)
console.log(`server listening on port ${port}`);
