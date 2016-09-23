angular
  .module('auction-app')
  .controller('itemsController', itemsController);

itemsController.$inject = ['$http', '$timeout'];
function itemsController ($http, $timeout) {
  var vm = this;
  vm.itemsSold = [];
  vm.newItem = {};
  vm.newItem.description="Twix";
  vm.newItem.price="1";
  vm.newItem.time="5";
  vm.newItem.increment="0.05";
  vm.soldOut = false;



  vm.onTimeout = function(){
    vm.itemsList.map(function itemTime(item){
      if(item.time > 0){
        item.time--
        vm.setItemTime(item);
        vm.checkAllTimes();
      }
      // else if (item.time === 0){
      //   return;
      // }
    })
    mytimeout = $timeout(vm.onTimeout,1000 );
  }


  vm.checkAllTimes = function(){
    var check = vm.itemsList.filter(function isTimeZero(item){
      if(item.time > 0){
        return true;
      }
    })
    // console.log(check)
    if(check.length === 0){
      vm.soldOut=true;
      console.log(vm.soldOut)
    }
  }






  $http({
    method: 'GET',
    url: '/api/items'
  }).then(function onSuccess (response){
    vm.itemsList = response.data;
    console.log('item list ', vm.itemsList)
    vm.onTimeout();
    vm.checkAllTimes();
  }, function onError (error){
    console.log('GET error ', error);
  });



  vm.createItem = function(){
    $http({
      method: 'POST',
      url: '/api/items',
      data: vm.newItem
    }).then(function onSuccess(response){
      console.log(response.data)
      vm.soldOut=false;
      vm.itemsList.push(response.data);
      setTimeout(function(){
        // vm.deleteItem(response.data)
      }, response.data.time * 1000 * 60);

    }, function onError(error){
      console.log('POST error ', error);
    });
  }


  vm.bidItem = function (item) {
    item.price = item.price + item.increment;
    $http({
      method: 'PUT',
      url: '/api/items/'+item._id,
      data: item
    }).then(function onSuccess(response) {
      var index = vm.itemsList.indexOf(item);
      vm.itemsList.splice(index,1,response.data)
    }, function errorCallback(response) {
      console.log('PUT error ', response);
    });
  }

  vm.setItemTime = function (item) {
    $http({
      method: 'PUT',
      url: '/api/items/'+item._id,
      data: item
    }).then(function onSuccess(response) {
      var index = vm.itemsList.indexOf(item);
      vm.itemsList.splice(index,1,response.data)
    }, function errorCallback(response) {
      console.log('PUT error ', response);
    });
  }

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
