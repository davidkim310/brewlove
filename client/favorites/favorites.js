angular.module('BreweryAngular.favorites', [])
.controller('favoritesCtrl', function($scope, favoritesFactory){
  $scope.list = [];
  $scope.getFavorites = function(){
    console.log("we are in getfavorites ctrl");
    favoritesFactory.getFavorites()
      .then(function(data){
        $scope.list = data
        console.log("scopelist", $scope.list);
      })
  }
  $scope.addToFavorites = function(name){
    console.log("name in controller", name);
    console.log("we are in add to favorites");
    favoritesFactory.favorite(name)
  }
})
