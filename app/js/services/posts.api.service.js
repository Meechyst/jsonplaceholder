(function() {
  'use strict';

  angular.module('myApp.services').factory('PostService', PostService);

  PostService.$inject = ['Restangular', '$log', 'toastr', 'ApiService', '$q'];

  function PostService(Restangular, $log, toastr, ApiService, $q) {

    var baseUrl = ApiService.baseUrl
    var cachedPosts, cachedComments, cachedUserPosts, a, b, c;

    var service = {
      deletePost: deletePost,
      getAllCommentsofAPost: function (userId){ return $q.when(cachedComments || a || getAllCommentsofAPostHelper(userId))},
      getAllPosts: function (){ return $q.when(cachedPosts || b || getAllPostsHelper())},
      getAllPostsofAUser: function (){ return $q.when(cachedUserPosts || c || getAllPostsofAUserHelper(userId))},
      getPost: getPost,
      postPost: postPost,
      updatePost: updatePost
    };


    function getAllPostsHelper() {
      var deferred = $q.defer();
      b = deferred.promise;
      Restangular.all('/' + baseUrl + 'posts').getList().then(function(resp){
        cachedPosts = resp;
        deferred.resolve(resp);
      });
      return deferred.promise;
    }

    function getPost(id) {
      return Restangular.one('/' + baseUrl + 'posts', id).get()
    }


    function getAllCommentsofAPostHelper(userId) {
      var deferred = $q.defer();
      a = deferred.promise;
        Restangular.one('/' + baseUrl + 'posts', userId).getList('comments').then(function(resp) {
        cachedComments = resp;
        console.log(resp);
        deferred.resolve(resp);
      });
      return deferred.promise;
    }



    function getAllPostsofAUserHelper(userId) {
      c = deferred.promise;
      Restangular.all('/' + baseUrl + 'posts').customGETLIST('', {
        userId: userId
      }).then(function(resp) {
        cachedUserPosts = resp;
        deferred.resolve(resp);
      });
      return deferred.promise;
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
