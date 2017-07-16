(function() {
  'use strict';


  routes.$inject = ['$stateProvider', '$locationProvider'];

  function routes($stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<strong>Welcome</strong>'
      })
      .state('otherwise', {
        url: "*path",
        template: '<strong>404</strong>'
      })
  }


  angular.module('myApp').config(routes);


})();
