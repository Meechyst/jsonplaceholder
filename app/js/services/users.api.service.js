(function() {
  'use strict';

  angular.module('myApp.services').factory('UserService', UserService);

  UserService.$inject = ['Restangular', '$log', 'toastr', 'ApiService'];

  function UserService(Restangular, $log, toastr, ApiService) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllUsers: getAllUsers,
      getUser: getUser,
      postUser: postUser,
      updateUser: updateUser,
      deleteUser: deleteUser
    };


    function getAllUsers() {
      return Restangular.all('/' + baseUrl + 'users').getList();
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
