(function() {
  angular.module('myApp.post').controller('PostCommentDetailController', PostCommentDetailController);

  PostCommentDetailController.$inject = ['UserService', '_postComment'];

  function PostCommentDetailController(UserService, _postComment) {

    var vm = this;

    vm.comments = _postComment;
    
  }

})();
