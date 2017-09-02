(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.factory('ShoppingListFactory', ShoppingListFactory);

// To Buy List - controller
ToBuyController.$inject = ['ShoppingListFactory'];
function ToBuyController(ShoppingListFactory) {
  var list1 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list1.name = "";
  list1.quantity = "";

  list1.items = shoppingList.getItems();

  list1.buyItem = function (itemIndex) {
    shoppingList.buyItem(itemIndex);
  };
}


// Already bought list - controller
AlreadyBoughtController.$inject = ['ShoppingListFactory'];
function AlreadyBoughtController(ShoppingListFactory) {
  var list2 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

  list2.name = "";
  list2.quantity = "";

  list2.items = shoppingList.getPurchasedItems();

  // list2.removeItem = function (itemIndex) {
  //   shoppingList.removeItem(itemIndex);
  // };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var items = [
    {name: "Apples", quantity: "10"},
    {name: "Steak", quantity: "3"},
    {name: "Milk", quantity: "2"},
    {name: "Pizza", quantity: "1"},
    {name: "Squash", quantity: "5"}
  ];

  // List of purchased items
  var bought_items = [];

  service.buyItem = function (itemIndex) {
    console.log (items[itemIndex]);
    var item = {
      name: items[itemIndex].name,
      quantity: items[itemIndex].quantity
    };
    bought_items.push(item);
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getPurchasedItems = function () {
    return bought_items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListCheckOffService();
  };

  return factory;
}

})();
