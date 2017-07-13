(function() {
  'use strict';

  angular.module('myApp.services').factory('PostService', PostService);

  PostService.$inject = ['restangular', '$log', 'toastr', 'ApiService'];

  function PostService(Restangular, $log, toastr, ApiService) {

    var baseUrl = ApiService.baseUrl

    var service = {
      getAllPosts: getAllPosts,
      getPost: getPost,
      getAllCommentsofAPost: getAllCommentsofAPost,
      getAllPostsofAUser: getAllPostofAUser,
      postPost: postPost,
      updatePost: updatePost,
      deletePost: deletePost
    };


    function getAllPosts() {

      Restangular.all(baseUrl + 'posts').getList().then(function(resp) {
        console.log('get All Posts ' + resp.data);
        return resp.data;
      });
    }

    function getPost(id) {
      Restangular.one(baseUrl + 'posts', id).get().then(function(resp) {
        console.log('get spesific post ' + resp);
        return resp.data;
      });
    }

    function getAllCommentsofAPost(commentId) {
      Restangular.one(baseUrl + 'posts', commentId).one('comments').get().then(function(resp) {
        console.log('get all comments of a post ' + resp);
        return resp.data;
      });
    }

    function getAllPostsofAUser(userId) {
      Restangular.all(baseUrl + 'posts').customGETLIST('', {
        userId: userId
      }).then(function(resp) {
        console.log("get all posts of a user" + resp);
        return resp.data;
      });
    }

    function postPost(data) {
      Restangular.all(baseUrl + 'posts').post(data).then(function(resp) {
        console.log("new post" + resp.data);
        return resp;
      });
    }

    function updatePost(data, id) {
      Restangular.one(baseUrl + 'posts', id).customPUT().then(function(resp) {
        console.log('update a post' + resp.data);
        return resp;
      });
    }

    function deletePost(id) {
      Restangular.one(baseUrl + 'posts', id).remove();
      console.log('delete a post');

    }

    return service;
  }
})();
