(function() {
  angular.module('myApp.post').controller('PostDetailController', PostDetailController);

  PostDetailController.$inject = ['_post'];

  function PostDetailController(_post) {

    var vm = this;

    // vm.isLoading = true;
    vm.isNotFound = false;

    if (_post.id > 0) {
      vm.post = _post;
      vm.postUserId = _post.userId;
    } else {
      vm.isNotFound = true;
    }
  }
})();
