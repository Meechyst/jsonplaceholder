(function () {
    'use strict';

    angular.module('asd.components').component('profileHeader', {
        templateUrl: 'templates/profile-header.html',
        controller: ProfileHeaderController,
        bindings: {
            entity: '<'
        }
    });

    ProfileHeaderController.$inject = ['$mdDialog', 'ProfileAPI', '$scope'];

    function ProfileHeaderController($mdDialog, ProfileAPI, $scope ) {
        var vm = this;
        vm.openImageUpload = _openImageUpload;
        vm.subheaders = subheaders;

        $scope.hi = 'hi from profileheader controller';

        $scope.enterNew = function(){

            console.log(event.which || event.keyCode);

        };



        function _openImageUpload(file) {
            if (file) {
                $mdDialog.show({
                    controller: 'ProfilController as $ctrl',
                    templateUrl: 'templates/profile-image-upload.dialog.html',
                    resolve: {
                        file: function () {
                            return file;
                        },
                        subheader: function(){
                            return 'router.js'
                        }
                    }
                });
            }
        }

        function subheaders() {
            return ProfileAPI.subheader.get($stateParams.userId).then(function (result){
               return result.data;
            });
        }








    }

})();