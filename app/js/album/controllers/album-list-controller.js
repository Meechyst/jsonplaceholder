(function() {
  
  angular.module('myApp.album').controller('AlbumListController', AlbumListController);

  AlbumListController.$inject = ['AlbumService'];

  function AlbumListController(AlbumService) {
    var vm = this;
    vm.isLoading = true;
    vm.isNotFound = false;

    AlbumService.getAllAlbums().then(function(res) {
      if (res) {
        vm.albums = res;
        vm.isLoading = false;
      } else {
        vm.isNotFound = true;
      }
    });
  }
})();
