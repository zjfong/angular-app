console.log('app.js is working');

angular
  .module('auction-app', ['ngRoute'])
  .config(config);





config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
      templateUrl: '/views/templates/item.html',
      controllerAs: 'ItemsIndexCtrl',
      controller: 'ItemsIndexController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}
