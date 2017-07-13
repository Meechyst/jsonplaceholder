(function() {
  'use strict';


  routes.$inject = ['$urlRouterProvider', '$stateProvider'];

  function routes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      template: 'sup'
    });

  }


  angular.module('myApp').config(routes);





})();
