(function() {
  angular.module('myApp.album').controller('AlbumDetailController', AlbumDetailController);

  AlbumDetailController.$inject = ['_album'];

  function AlbumDetailController(_album) {

    var vm = this;

    // vm.isLoading = true;
    vm.isNotFound = false;

      if (_album.id > 0) {
        vm.album =   _album;
        vm.albumUserId = _album.userId;
      } else {
        vm.isNotFound = true;
      }

  }
})();
