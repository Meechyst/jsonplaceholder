(function() {
  angular.module('myApp.album').controller('AlbumController', AlbumController);

  AlbumController.$inject = ['AlbumService', 'UserService', '$stateParams', '$state'];

  function AlbumController(AlbumService, UserService, $stateParams, $state) {
    var vm = this;
    var albumId = $stateParams.id;
    var albumsUri = "";

    vm.goToAlbums = function() {
      console.log('im in function')
        $state.go('allAlbums');
    };

    // vm.albums = _result;

    AlbumService.getAllAlbums().then(function(res) {
      vm.albums = res;
    });

    AlbumService.getAlbum(albumId).then(function(res) {
      vm.album = res;
      vm.albumUserId = vm.album.userId;
      console.log('first');
    });

    UserService.getUser(vm.albumUserId).then(function(res) {
      //horrible
      vm.user = res[vm.albumUserId -1];
      console.log('second');
    });


  }
})();
