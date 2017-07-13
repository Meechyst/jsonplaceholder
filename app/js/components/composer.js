(function () {
    'use strict';

    angular.module('asd.components').component('composer', {
        templateUrl: 'templates/composer.html',
        controller: ComposerController,
        bindings: {
            onSubmit: '='
        }
    });

    ComposerController.$inject = ['$scope'];

    function ComposerController($scope) {
        var vm = this;
        vm.isLoading = false;
        vm.status = '';
        vm.disableSubmit = disableSubmit;
        vm.submit = submit;

        function disableSubmit() {
            return vm.status === undefined || vm.status.length == 0 || vm.composerForm.$invalid || vm.isLoading;
        }

        function submit() {
            vm.isLoading = true;
            vm.onSubmit(vm.status).then(function (result) {
                $scope.$emit('statusUpdateCreated', result.data);
            }).finally(function () {
                vm.isLoading = false;
                vm.status = '';
            });
        }
    }

})();