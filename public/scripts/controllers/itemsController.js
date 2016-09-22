angular
  .module('auction-app')
  .controller('itemsController', itemsController);

itemsController.$inject = ['$http'];
function itemsController ($http) {
  var vm = this;
  vm.test = 'index test';
  vm.newItem = {};

  // vm.itemsList = [
  //   {
  //     name: 'Dunder Mifflin Paper',
  //     condition: 'new',
  //     price: '50'
  //   },
  //   {
  //     name: 'Yellow Umbrella',
  //     condition: 'used',
  //     price: '5'
  //   }
  // ]



  $http({
    method: 'GET',
    url: '/api/items'
  }).then(function onSuccess (response){
    // console.log(response.data);
    vm.itemsList = response.data;
  }, function onError (error){
    console.log('GET error ', error);
  });

  vm.createItem = function(){
    console.log('hello')
    $http({
      method: 'POST',
      url: '/api/items',
      data: vm.newItem
    }).then(function onSuccess(response){
      console.log(response.data)
      vm.newItem.push(response.data)
    }, function onError(error){
      console.log('POST error ', error);
    });
  }










}
