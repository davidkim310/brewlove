angular.module("BreweryAngular.home", [])

// .controller('homeController', function(breweryFactory){
//   var vm = this;
//   vm.location = '';
//   vm.breweryData = [];
//
//   vm.submitForm = function(){
//     breweryFactory.getBrewery(vm.location)
//       .then(function(resp){
//         vm.breweryData = resp.data
//       })
//       .catch(function(err){
//         console.log("error: ", err);
//       })
//   }
// })

.controller("homeCtrl", function($scope, brewerydescription){
  $scope.location;
  $scope.data;
  $scope.submitForm = function(location){
    brewerydescription.getBrewery(location)
    .then(function(dataFromServer){
      console.log("location is: ", dataFromServer);
      console.log("data is: ", dataFromServer.data);
      $scope.data = dataFromServer.data;
    })
  }
})
