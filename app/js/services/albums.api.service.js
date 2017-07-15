  (function() {
  'use strict';

  angular.module('myApp.services').factory('AlbumService', AlbumService);

  AlbumService.$inject = ['Restangular', '$log', 'toastr', 'ApiService', '$http', '$q'];

  function AlbumService(Restangular, $log, toastr, ApiService, $http, $q) {

    var baseUrl = ApiService.baseUrl

    var cachedAlbums, p;

    var service = {
      deleteAlbum: deleteAlbum,
      getAllAlbums: function (){ return $q.when(cachedAlbums || p || getAllAlbumsHelper())},
      getAlbum: getAlbum,
      getAllAlbumsofAUser: getAllAlbumsofAUser,
      postAlbum: postAlbum,
      updateAlbum: updateAlbum,
    };


    function getAllAlbumsHelper() {
      var deferred = $q.defer();
      p = deferred.promise;
      Restangular.all('/'+baseUrl + 'albums').getList().then(function(resp){
        cachedAlbums = resp;
        deferred.resolve(resp);
      });
      return deferred.promise;
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
