(function() {
  angular.module('myApp.post').controller('PostUserDetailController', PostUserDetailController);

  PostUserDetailController.$inject = ['UserService', '_post', '$state'];

  function PostUserDetailController(UserService, _post, $state) {

    var vm = this;

    vm.isUserDetailLoading = true;
    vm.isUserDetailNotFound = false;
    // console.log(_post.userId);
    UserService.getUser(_post.userId).then(function(res) {
      if (res.id > 0) {
        vm.user = res;
      } else {
        vm.isUserDetailNotFound = true;
      }
      vm.isUserDetailLoading = false;
    });
  }

})();
