angular
  .module('auction-app')
  .controller('itemsController', itemsController);

itemsController.$inject = ['$http', '$scope'];
function itemsController ($http, $scope) {
  var vm = this;
  vm.test = 'index test';
  vm.newItem = {};
  vm.newItem.condition="new";
  vm.newItem.price="1";
  vm.newItem.time="5000";


vm.showItems = function(){
  $http({
    method: 'GET',
    url: '/api/items'
  }).then(function onSuccess (response){
    // console.log(response.data);
    vm.itemsList = response.data;
  }, function onError (error){
    console.log('GET error ', error);
  });
}
vm.showItems();

  vm.createItem = function(){
    // console.log('hello')
    $http({
      method: 'POST',
      url: '/api/items',
      data: vm.newItem
    }).then(function onSuccess(response){
      console.log(response.data)
      vm.itemsList.push(response.data);
      console.log(vm.itemsList);
      vm.showItems();

      setTimeout(function(){
        vm.deleteItem(response.data)
      }, response.data.time);

    }, function onError(error){
      console.log('POST error ', error);
    });
  }

  //  vm.editItem = function (item) {
  //   $http({
  //     method: 'PUT',
  //     url: '/api/items/'+item._id,
  //     data: item
  //   }).then(function onSuccess(response) {

  //   }, function errorCallback(response) {
  //     console.log('PUT error ', response);
  //   });
  // }

  vm.deleteItem = function (item) {
    console.log(item)
    $http({
      method: 'DELETE',
      url: '/api/items/'+ item._id
    }).then(function onSuccess(response) {
      var index = vm.itemsList.indexOf(item);
      vm.itemsList.splice(index,1)
    }, function errorCallback(response) {
      console.log('DELETE error ', response);
    });
  }










}
