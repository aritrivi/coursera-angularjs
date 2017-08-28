(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList = '';
  $scope.response = '';
  $scope.pass = false;

console.log($scope.lunchList);

  $scope.checkTooMuch = function () {
    if ($scope.lunchList == "") {
      $scope.response = "Please enter data first"
      return;
    }
    var items = $scope.lunchList.split(",");
    var count = 0;
    var x = 0;

    for (x = 0; x < items.length; x++) {
      if (items[x] != " ") {
        count += 1;
      }
    }
    if (count > 3) {
      $scope.response = "Too much!";
      $scope.pass = true;
    }
    if (count <= 3) {
      $scope.response = "Enjoy!";
      $scope.pass = true;
    }
  };
}

})();
