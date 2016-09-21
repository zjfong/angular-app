angular
  .module('auction-app')
  .controller('itemsController', itemsController);


function itemsController () {
  var vm = this;
  vm.test = 'index test';

  vm.itemsList = [
    {
      name: 'Dunder Mifflin Paper',
      condition: 'new',
      price: '50'
    },
    {
      name: 'Yellow Umbrella',
      condition: 'used',
      price: '5'
    }
  ]



}
