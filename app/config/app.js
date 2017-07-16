(function () {
    'use strict';

    angular.module('myApp',
        [
            'ui.router',
            'ngMaterial',
            'restangular',
            'toastr',

            'myApp.services',
            'myApp.directives',
            'myApp.album',
            'myApp.comment',
            'myApp.photo',
            'myApp.post',
            'myApp.todo',
            'myApp.user'
        ]
    );
})();
