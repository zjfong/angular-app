angular.module('auction-app')
  .directive('itemCard', itemCard);


function itemCard(){
  var directive = {
    scope: {
      item: '=',
      delete: '&'
    },
    restrict: 'E',
    templateUrl: '/templates/item',
    replace: true
  };


  return directive;
}
