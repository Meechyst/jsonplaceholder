(function() {
  'use strict';

  var app = angular.module('myApp.services').provider('ApiService', ApiService);

  ApiService.$inject = [];

  function ApiService() {

    var baseUrl = "";

    this.config = function(url) {

      baseUrl = url;
        console.log(baseUrl);
    };

    this.$get = function() {
      var service = {baseUrl:baseUrl};
      return service;
    }
  }

  app.config(['ApiServiceProvider', function(ApiServiceProvider) {
    console.log('ApiServiceProvider');
    ApiServiceProvider.config('jsonplaceholder.typicode.com/');
  }]);

})();
