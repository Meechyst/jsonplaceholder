(function() {
  'use strict';

  angular.module('myApp.services').factory('UserService', UserService);

  UserService.$inject = ['Restangular', '$log', 'toastr', 'ApiService', '$q'];

  function UserService(Restangular, $log, toastr, ApiService, $q) {

    var cachedUsers, p;
    var baseUrl = ApiService.baseUrl;

    var service = {
      deleteUser: deleteUser,
      getAllUsers: function(){return $q.when(cachedUsers || p ||getAllUsersHelper())},
      getUser: getUser,
      postUser: postUser,
      updateUser: updateUser
    };


    function getAllUsersHelper() {
      var deferred = $q.defer();
      p = $q.promise;
      Restangular.all('/' + baseUrl + 'users').getList().then(function(resp){
        cachedUsers = resp;
        deferred.resolve(resp);
      });
      return deferred.promise;
    }

    function getUser(id) {
      return Restangular.one('/' + baseUrl + 'users', id).get();
    }


    function postUser(data) {
      Restangular.all(baseUrl + 'users').post(data).then(function(resp) {
        console.log("new user" + resp.data);
        return resp;
      });
    }

    function updateUser(data, id) {
      Restangular.one(baseUrl + 'users', id).customPUT().then(function(resp) {
        console.log('update a user' + resp.data);
        return resp;
      });
    }

    function deleteUser(id) {
      Restangular.one(baseUrl + 'users', id).remove();
      console.log('delete a user');

    }

    return service;
  }
})();
