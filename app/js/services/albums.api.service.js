  (function() {
  'use strict';

  angular.module('myApp.services').factory('AlbumService', AlbumService);

  AlbumService.$inject = ['Restangular', '$log', 'toastr', 'ApiService', '$http', '$q'];

  function AlbumService(Restangular, $log, toastr, ApiService, $http, $q) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllAlbums: getAllAlbums,
      getAlbum: getAlbum,
      getAllAlbumsofAUser: getAllAlbumsofAUser,
      postAlbum: postAlbum,
      updateAlbum: updateAlbum,
      deleteAlbum: deleteAlbum
    };


    function getAllAlbums() {
      return Restangular.all('/'+baseUrl + 'albums').getList();
    }

    function getAlbum(id) {
     return  Restangular.one('/'+baseUrl + 'albums', id).get();
    }

    function getAllAlbumsofAUser(userId) {
      Restangular.all('/'+baseUrl + 'albums').customGETLIST("", {
          userId: userId
        })
        .then(function(resp) {
          console.log("get all albums of a user" + resp);
          return resp.data;
        });
    }

    function postAlbum(data) {
      Restangular.all('/'+baseUrl + 'albums').post(data).then(function(resp) {
        console.log("new album" + resp.data);
        return resp;
      });
    }

    function updateAlbum(data, id) {
      Restangular.one('/'+baseUrl + 'albums', id).customPUT().then(function(resp) {
        console.log('update an album' + resp.data);
        return resp;
      });
    }

    function deleteAlbum(id) {
      Restangular.one('/'+baseUrl + 'albums', id).remove();
    }

    return service;
  }
})();
