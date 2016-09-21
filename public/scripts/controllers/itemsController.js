angular
  .module('auction-app')
  .controller('itemsController', itemsController);

// itemsController.$inject = ['$http'];
function itemsController ($http) {
  var vm = this;
  vm.test = 'index test';

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
  }).then(onSuccess, onError)

  function onSuccess (response){
    // console.log(response.data);
    vm.itemsList = response.data;
  }

  function onError (error){
    console.log('get error ', error);
  }





}
