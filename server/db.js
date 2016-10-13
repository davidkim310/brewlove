//set up our mongoose connection in this file
const mongoose = require('mongoose');

mongoose.connect('mongodb://demo:demo@ds047865.mlab.com:47865/mvpdemo');

//here we can check on our mongo connection
var db = mongoose.connection;
//checks connection status
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log('Mongodb connection is open');
})
//create the schema for our favorite breweries
var FavoriteSchema = new mongoose.Schema({
  brewery: String,
}, {collection: 'FavoritesCollection'});

mongoose.model('Favorite', FavoriteSchema);

module.export = db
