(function() {
  'use strict';

  angular.module('myApp.services').factory('CommentService', CommentService);

  CommentService.$inject = ['restangular', '$log', 'toastr', 'ApiService'];

  function CommentService(Restangular, $log, toastr, ApiService) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllComments: getAllComments,
      getComment: getComment,
      postComment: postComment,
      updateComment: updateComment,
      deleteComment: deleteComment
    };


    function getAllComments() {

      Restangular.all(baseUrl + 'comments').getList().then(function(resp) {
        console.log('get All comments ' + resp.data);
        return resp.data;
      });
    }

    function getComment(id) {
      Restangular.one(baseUrl + 'comments', id).get().then(function(resp) {
        console.log('get spesific comment ' + resp);
        return resp.data;
      });
    }

    function postComment(data) {
      Restangular.all(baseUrl + 'comments').post(data).then(function(resp) {
        console.log("new comment" + resp.data);
        return resp;
      });
    }

    function updateComment(data, id) {
      Restangular.one(baseUrl + 'comments', id).customPUT().then(function(resp) {
        console.log('update a comment' + resp.data);
        return resp;
      });
    }

    function deleteComment(id) {
      Restangular.one(baseUrl + 'comments', id).remove();
    }

    return service;
  }
})();
