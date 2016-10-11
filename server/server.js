//initialize the express framework
const express = require('express')
//express setup
const app = express();
const http = require('http');
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
// var mongoose = require('mongoose')

mongoose.connect('mongodb://demo:demo@ds047865.mlab.com:47865/mvpdemo');

//here we can check on our mongo connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log('Mongodb connection is open');
})

var FavoriteSchema = new mongoose.Schema({
  id: String,
  brewery: String,
}, {collection: 'FavoritesCollection'});

mongoose.model('Favorite', FavoriteSchema);

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
