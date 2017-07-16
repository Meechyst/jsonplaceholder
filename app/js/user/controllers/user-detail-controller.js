(function() {

  angular.module('myApp.user').controller('UserDetailController', UserDetailController);

  UserDetailController.$inject = ['_user', '$sce'];

  function UserDetailController(_user, $sce) {
    var vm = this;
    vm.userNotFound = false;
    vm.showMap = false;


    if (_user.id > 0) { vm.user = _user; } else { vm.userNotFound = true; };

    vm.userGeo = vm.user.address.geo.lat + "," + vm.user.address.geo.lng;
    vm.mapUrl = $sce.trustAsResourceUrl
    ("https://www.google.com/maps/embed/v1/place?key=AIzaSyDuTD9neX7jtRe-YcqDAvApGPA5qHX6kjk&q="+ vm.userGeo);
    vm.toggleMap = function() {
      vm.showMap = !vm.showMap;
    }
  }
})();
