(function() {
  'use strict';


  routes.$inject = ['$stateProvider', '$locationProvider'];

  function routes($stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<strong>you are at root..click something else</strong>'
      })
      .state('otherwise', {
        url: "*path",
        template: '<strong>no route available</strong'
      })
  }


  angular.module('myApp').config(routes);





})();
