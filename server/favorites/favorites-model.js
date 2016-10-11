var mongoose = require('mongoose')

var favoritesSchema = new mongoose.Schema({
  name: { type: String, required true},
  limit: {type: Number, default: 25}
  breweries: [{
    name: String
  }]
},
{collection: "FavoritesCollection"}
)

module.exports = mongoose.model('Favorites', favoritesSchema);
