(function() {
  'use strict';

  angular.module('myApp.services').factory('TodoService', TodoService);

  TodoService.$inject = ['restangular', '$log', 'toastr', 'ApiService'];

  function TodoService(Restangular, $log, toastr, ApiService) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllTodos: getAllTodos,
      getTodo: getTodo,
      getAllTodosofAUser: getAllTodosofAUser,
      postTodo: postTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo
    };


    function getAllTodos() {

      Restangular.all(baseUrl + 'todos').getList().then(function(resp) {
        console.log('get All todos ' + resp.data);
        return resp.data;
      });
    }

    function getTodo(id) {
      Restangular.one(baseUrl + 'todos', id).get().then(function(resp) {
        console.log('get spesific todo ' + resp);
        return resp.data;
      });
    }

    function getAllTodosofAUser(userId) {
      Restangular.all(baseUrl + 'todos').customGETLIST('', {
        userId: userId
      }).then(function(resp) {
        console.log("get all todos of a user" + resp);
        return resp.data;
      });
    }

    function postTodo(data) {
      Restangular.all(baseUrl + 'todos').post(data).then(function(resp) {
        console.log("new todo" + resp.data);
        return resp;
      });
    }

    function updateTodo(data, id) {
      Restangular.one(baseUrl + 'todos', id).customPUT().then(function(resp) {
        console.log('update a todo' + resp.data);
        return resp;
      });
    }

    function deleteTodo(id) {
      Restangular.one(baseUrl + 'todos', id).remove();
      console.log('delete a todo');

    }

    return service;
  }
})();
