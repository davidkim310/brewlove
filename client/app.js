angular.module('BreweryAngular', [
  "ui.router",
  "BreweryAngular.home"
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
    return $http.get('/favorites')
    .then(function(favorites){
      return favorites;
    })
  }
  let favorite = function(name){
    console.log("in favoritesFactory.favorite");
    console.log("name", name);
    return $http.post('/Favorites', {
      'brewery': name
    })
  }
  return {
    getFavorites: getFavorites,
    favorite: favorite
  }
})
.controller('favoritesCtrl', function($scope, favoritesFactory){
  // $scope.list = [];
  // $scope.getFavorites = function(){
  //   favoritesFactory.getFavorites()
  //     .then(function(data){
  //       $scope.list = data
  //     })
  // }
  $scope.addToFavorites = function(name){
    console.log("name in controller", name);
    console.log("we are in add to favorites");
    favoritesFactory.favorite(name)
  }
})
