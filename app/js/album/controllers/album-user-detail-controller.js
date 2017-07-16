(function() {
  angular.module('myApp.album').controller('AlbumUserDetailController', AlbumUserDetailController);

  AlbumUserDetailController.$inject = ['UserService', '_album', '$state'];

  function AlbumUserDetailController(UserService, _album, $state) {

    var vm = this;

    vm.isUserDetailLoading = true;
    vm.isUserDetailNotFound = false;

    UserService.getUser(_album.userId).then(function(res) {
      if (res.id > 0) {
        vm.user = res;
      } else {
        vm.isUserDetailNotFound = true;
      }
      vm.isUserDetailLoading = false;
    });
  }

})();
