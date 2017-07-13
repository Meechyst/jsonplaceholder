(function() {
  'use strict';

  angular.module('myApp.services').factory('PhotoService', PhotoService);

  PhotoService.$inject = ['restangular', '$log', 'toastr', 'ApiService'];

  function PhotoService(Restangular, $log, toastr, ApiService) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllPhotos: getAllPhotos,
      getPhoto: getPhoto,
      getAllPhotosofAnAlbum: getAllPhotosofAnAlbum,
      postPhoto: postPhoto,
      updatePhoto: updatePhoto,
      deletePhoto: deletePhoto
    };


    function getAllPhotos() {

      Restangular.all(baseUrl + 'photos').getList().then(function(resp) {
        console.log('get All photos ' + resp.data);
        return resp.data;
      });
    }

    function getPhoto(id) {
      Restangular.one(baseUrl + 'photos', id).get().then(function(resp) {
        console.log('get spesific photo ' + resp);
        return resp.data;
      });
    }

    function getAllPhotosofAnAlbum(albumId) {
      Restangular.all(baseUrl + 'photos').customGETLIST('', {
        albumId: albumId
      }).then(function(resp) {
        console.log("get all photos of an album" + resp);
        return resp.data;
      });
    }

    function postPhoto(data) {
      Restangular.all(baseUrl + 'photos').post(data).then(function(resp) {
        console.log("new photo" + resp.data);
        return resp;
      });
    }

    function updatePhoto(data, id) {
      Restangular.one(baseUrl + 'photos', id).customPUT().then(function(resp) {
        console.log('update a photo' + resp.data);
        return resp;
      });
    }

    function deletePhoto(id) {
      Restangular.one(baseUrl + 'photos', id).remove();
      console.log('delete a photo');
    };



    return service;
  }
})();
