(function() {
  'use strict';

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('users', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'js/user/templates/index.html'
          },
          'user-header@users': {
            templateUrl: 'js/user/templates/user-header.html'
          }
        }
      })
      .state('users.list', {
        url: '/users',
        views: {
          'user-list': {
            templateUrl: '/js/user/templates/user-list.html',
            controller: 'UserListController',
            controllerAs: 'list'
          }
        }
      })
      .state('users.details', {
        url: '/users/:id',
        views: {
          'user-detail': {
            templateUrl: 'js/user/templates/user-detail.html',
            controller: 'UserDetailController',
            controllerAs: 'detail'
          }
        },
        resolve: {
          _user: ['UserService', '$stateParams', function(UserService, $stateParams){
              return UserService.getUser($stateParams.id).then(function(resp){
                return resp;
              });
          }]
        }
      })

  }

  angular.module('myApp.user').config(routes);

})();
