angular.module('auction-app')
  .directive('itemCard', itemCard);


function itemCard(){
  var directive = {
    scope: {
      item: '@'
    },
    restrict: 'E',
    templateUrl: '../views/templates/item.html',
    replace: true
  };


  return directive;
}
