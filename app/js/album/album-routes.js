(function() {
  'use strict';

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('albums', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'js/album/templates/index.html'
          },
          'album-header@albums': {
            templateUrl: 'js/album/templates/album-header-info.html',
          }
        }
      }).state('albums.list', {
        url: '/albums',
        views: {
          'album-list': {
            templateUrl: 'js/album/templates/album-list.html',
            controller: 'AlbumListController',
            controllerAs: 'list'
          }
        }
        // resolve: {
        //   _albums: ['AlbumService', function(AlbumService){
        //     return AlbumService.getAllAlbums().then(function(resp){
        //       return resp;
        //     });
        //   }]
        // }
      })
      .state('albums.details', {
        url: '/albums/:id',
        views: {
          'album-detail': {
            templateUrl: 'js/album/templates/album-detail.html',
            controller: 'AlbumDetailController',
            controllerAs: 'detail'

          },
          'album-user-detail@albums.details': {
            templateUrl: 'js/album/templates/album-user-detail.html',
            controller: 'AlbumUserDetailController',
            controllerAs: 'userdetail'
          }
        },
        resolve: {
          _album: ['AlbumService', '$stateParams', function(AlbumService, $stateParams) {
            return AlbumService.getAlbum($stateParams.id).then(function(resp) {
              return resp;
            });
          }]
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
