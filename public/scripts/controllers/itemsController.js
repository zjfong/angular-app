angular
  .module('auction-app')
  .controller('itemsController', itemsController);

itemsController.$inject = ['$http', '$timeout'];
function itemsController ($http, $timeout) {
  var vm = this;
  vm.itemsSold = [];
  vm.newItem = {};
  vm.soldOut = false;
  vm.isItemsSold = false;

  vm.newItem.name="Twix"
  vm.newItem.description="candy";
  vm.newItem.price="1";
  vm.newItem.time="7";
  vm.newItem.increment="0.05";



  vm.onTimeout = function(){
    vm.itemsList.map(function itemTime(item){
      if(item.time > 0){
        item.time--
        vm.setItemTime(item);
        vm.checkSaleTimes();
        vm.checkSoldTimes();
      }
      // else if (item.time === 0){
      //   return;
      // }
    })
    mytimeout = $timeout(vm.onTimeout,1000 );
  }


  vm.checkSaleTimes = function(){
    var check = vm.itemsList.filter(function isTimeZero(item){
      if(item.time > 0){
        return true;
      }
    })
    // console.log(check)
    if(check.length === 0){
      vm.soldOut=true;
      // console.log('soldOut ', vm.soldOut)
    }
  }

  vm.checkSoldTimes = function(){
    var check = vm.itemsList.filter(function isTimeZero(item){
      if(item.time === 0){
        return true;
      }
    })
    console.log(check)
    if(check.length === vm.itemsList.length){
      vm.isItemsSold=false;
      // console.log('isItemsSold ', vm.isItemsSold)
    }
    if(check.length>0){
      vm.isItemsSold=true;
      // console.log('isItemsSold ', vm.isItemsSold)
    }
    if(check.length === 0){
      vm.isItemsSold=false;
    }
  }






  $http({
    method: 'GET',
    url: '/api/items'
  }).then(function onSuccess (response){
    vm.itemsList = response.data;
    console.log('item list ', vm.itemsList)
    vm.onTimeout();
    vm.checkSaleTimes();
    vm.checkSoldTimes();
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
    item.time = item.time + 10;
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
      vm.checkSoldTimes();
    }, function errorCallback(response) {
      console.log('DELETE error ', response);
    });
  }










}
