(function() {
  'use strict';

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider

      .state('album', {
        url: '/albumpanel',
        views: {
          '': {
            template: 'Album Panel',
            controller: 'AlbumController',
            controllerAs: 'alb'
          },
          'side': {
            templateUrl: 'js/album/templates/side.html',
            controller: 'AlbumController',
            controllerAs: 'alb'
          }
        }
      }).state('allAlbums', {
        url: '/albums',
        templateUrl: 'js/album/templates/albums.html',
        controller: 'AlbumController',
        controllerAs: 'alb',
        // resolve: {
        //   _albums: ['AlbumService', function(AlbumService){
        //     return AlbumService.getAllAlbums().then(function(resp){
        //       return resp;
        //     });
        //   }]
        // }
      })
      .state('oneAlbum', {
        url: '/albums/:id',

        views: {
          '': {
            templateUrl: 'js/album/templates/album.html',
            controller: 'AlbumController',
            controllerAs: 'alb'
          },
          'side': {
            templateUrl: 'js/album/templates/side.html',
            controller: 'AlbumController',
            controllerAs: 'alb'
          }
        },
        // resolve: {
        //   _album: ['AlbumService', '$stateParams', function(AlbumService, $stateParams){
        //     return AlbumService.getAlbum($stateParams.id).then(function(resp){
        //       return resp;
        //     });
        //   }]
        // }
      })
  }
  angular.module('myApp.album').config(routes);
})();
