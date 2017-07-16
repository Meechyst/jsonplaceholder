(function() {
  'use strict';

  angular.module('myApp.services').factory('PostService', PostService);

  PostService.$inject = ['Restangular', '$log', 'toastr', 'ApiService', '$q'];

  function PostService(Restangular, $log, toastr, ApiService, $q) {

    var baseUrl = ApiService.baseUrl;
    var cachedPosts, p;

    var service = {
      deletePost: deletePost,
      getAllCommentsofAPost: getAllCommentsofAPost,
      getAllPosts: function (){ return $q.when(cachedPosts || p || getAllPostsHelper())},
      getAllPostsofAUser: getAllPostsofAUser,
      getPost: getPost,
      postPost: postPost,
      updatePost: updatePost
    };


    function getAllPostsHelper() {
      var deferred = $q.defer();
      p = deferred.promise;
      Restangular.all('/' + baseUrl + 'posts').getList().then(function(resp){
        cachedPosts = resp;
        deferred.resolve(resp);
      });
      return deferred.promise;
    }

    function getPost(id) {
      return Restangular.one('/' + baseUrl + 'posts', id).get()
    }


    function getAllCommentsofAPost(userId) {
      return Restangular.one('/' + baseUrl + 'posts', userId).getList('comments')
    }

    function getAllPostsofAUser(userId) {
      return Restangular.all('/' + baseUrl + 'posts').customGET('', { userId: userId })
    }

    function postPost(data) {
      Restangular.all(baseUrl + 'posts').post(data).then(function(resp) {
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
