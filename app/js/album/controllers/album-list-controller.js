(function() {
  angular.module('myApp.album').controller('AlbumListController', AlbumListController);

  AlbumListController.$inject = ['AlbumService'];

  function AlbumListController(AlbumService) {

    var vm = this;

    AlbumService.getAllAlbums().then(function(res) {
      vm.albums = res;
    });
  }
})();
