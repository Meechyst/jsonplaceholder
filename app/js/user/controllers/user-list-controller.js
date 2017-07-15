(function() {

  angular.module('myApp.user').controller('UserListController', UserListController);

  UserListController.$inject = ['UserService'];

  function UserListController(UserService) {
    var vm = this;
    vm.isLoading = true;
    vm.isNotFound = false;

    UserService.getAllUsers().then(function(res) {
      if (res) {
        vm.users = res;
        vm.isLoading = false;
      } else {
        vm.isNotFound = true;
      }
    });
  }

})();
