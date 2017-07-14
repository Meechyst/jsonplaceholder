(function(){

  angular.module('myApp.user').controller('UserDetailController', UserDetailController);

  UserDetailController.$inject = ['_user'];

  function UserDetailController(_user){
    var vm = this;
    vm.userNotFound = false;
    vm.greet= "hi";

    if (_user.id > 0) {
      vm.user = _user;
      console.log(_user);
    } else {
      vm.userNotFound = true;
    }


  }


})();
