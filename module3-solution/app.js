(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true,
    link: FoundItemsDirectiveLink,
    transclude: true
  };

  return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
console.log(element);
}

function FoundItemsDirectiveController() {
  var list = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.term = "";
  menu.found = "";

  menu.getMatchedMenuItems = function () {
    var i = 0;
    var foundItems = [];

    var promise = MenuSearchService.getMatchedMenuItems(menu.term);

    promise.then(function (response) {
      for (i = 0; i < response.data.menu_items.length; i++) {
        if (response.data.menu_items[i].name.indexOf(menu.term) !== -1) {
          foundItems.push(response.data.menu_items[i]);
        }
      }
      menu.found = foundItems;
console.log(foundItems)
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };


}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

}


})();
