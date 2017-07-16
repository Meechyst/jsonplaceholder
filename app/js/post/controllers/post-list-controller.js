(function() {

  angular.module('myApp.post').controller('PostListController', PostListController);

  PostListController.$inject = ['PostService'];

  function PostListController(PostService) {
    var vm = this;
    vm.isLoading = true;
    vm.isNotFound = false;

    PostService.getAllPosts().then(function(res) {
      if (res) {
          vm.posts = res;
          vm.isLoading = false;
      } else {
        vm.isNotFound = true;
      }
    });


  }
})();
