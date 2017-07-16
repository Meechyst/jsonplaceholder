(function() {
  'use strict';

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('posts', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'js/post/templates/index.html'
          },
          'post-header@posts': {
            templateUrl: 'js/post/templates/post-header.html',
          }
        }
      }).state('posts.list', {
        url: '/posts',
        views: {
          'post-list': {
            templateUrl: 'js/post/templates/post-list.html',
            controller: 'PostListController',
            controllerAs: 'list'
          }
        }
        // _posts: ['PostService', function(PostService) {
        //   return PostService.getAllPosts().then(function(resp) {
        //     return resp;
        //   });
        // }]
      })
      .state('posts.details', {
        url: '/posts/:id',
        views: {
          'post-detail': {
            templateUrl: 'js/post/templates/post-detail.html',
            controller: 'PostDetailController',
            controllerAs: 'detail'
          },
          'post-user-detail@posts.details': {
            templateUrl: 'js/post/templates/post-user-detail.html',
            controller: 'PostUserDetailController',
            controllerAs: 'userdetail'
          },
          'post-comment-detail@posts.details': {
            templateUrl: 'js/post/templates/post-comment-detail.html',
            controller: 'PostCommentDetailController',
            controllerAs: 'commentdetail'
          }
        },
        resolve: {
          _post: ['PostService', '$stateParams', function(PostService, $stateParams) {
              return PostService.getPost($stateParams.id).then(function(resp) {
              return resp;
              console.log(resp);
            });
          }],
          // _postUser: ['PostService', '_post', function(PostService, _post){
          //   return PostService.getAllPostsofAUser(_post.userId).then(function() {
          //     return resp;
          //   });
          // }]
          _postComment: ['PostService', '$stateParams', function(PostService, $stateParams) {
            return PostService.getAllCommentsofAPost($stateParams.id).then(function(resp){
              return resp;
            });
          }]
        }
      })
  }
  angular.module('myApp.post').config(routes);
})();
