angular.module('BreweryAngular', [
  "ui.router",
  "BreweryAngular.home",
  "BreweryAngular.favorites"
])

.config(function($stateProvider,  $urlRouterProvider) {
  //any unmatched endpoint directs to home
  $urlRouterProvider.otherwise('/home');
  //set up our endpoints
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: "homeCtrl"
    })
    .state('favorites',{
      url: '/favorites',
      templateUrl: 'favorites/favorites.html',
      controller: 'favoritesCtrl'
    });
})
.factory("brewerydescription", function($http){
  let getBrewery = function(location){
    return $http.get('/api/brewery?brewery=' + location)
    .then(function(data){
      return data
    })
  }
  return {
    getBrewery:getBrewery
  }
})
.factory("favoritesFactory", function($http){
  let getFavorites = function(){
    console.log("we are in getFavorites");
    return $http.get('/Favorites')
    .then(function(favorites){
      // console.log("favorites", favorites);
      return favorites;
    })
  }
  let favorite = function(name, website){
    return $http.post('/Favorites', {
      'brewery': name,
      'website': website
    })
  }
  return {
    getFavorites: getFavorites,
    favorite: favorite
  }
})
