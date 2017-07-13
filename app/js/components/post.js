(function () {
    'use strict';

    angular.module('asd.components').component('post', {
        templateUrl: 'templates/post.html',
        controller: PostController,
        bindings: {
            content: '<'
        }
    });

    PostController.$inject = ['$scope', 'ProfileAPI', '$mdDialog'];

    function PostController($scope, ProfileAPI, $mdDialog) {
        var vm = this;

        vm.disableLike = false;
        vm.isCommentsVisible = false;
        vm.isLoading = false;

        vm.disableSubmit = disableSubmit;
        vm.like = like;
        vm.showLikes = showLikes;
        vm.submit = submit;
        vm.toggleComments = toggleComments;
        vm.unlike = unlike;

        function like() {
            vm.disableLike = true;
            ProfileAPI.post.like(vm.content.id).then(function (result) {
                vm.content.is_liked = true;
                vm.content.likes.unshift(result);
                vm.disableLike = false;
            });
        }

        function unlike() {
            vm.disableLike = true;
            ProfileAPI.post.unlike(vm.content.id).then(function (result) {
                vm.content.is_liked = false;
                vm.disableLike = false;
                vm.content.likes = _.reject(vm.content.likes, function (item) {
                    return item.id === result.id;
                });
            });
        }

        function showLikes(event) {
            $mdDialog.show({
                controller: 'LikesDialogController as $ctrl',
                templateUrl: 'templates/likes.dialog.html',
                resolve: {
                    users: [function () {
                        var users = _.map(vm.content.likes, function (like) {
                            return like.entity.name;
                        });

                        return users;
                    }]
                },
                targetEvent: event,
                clickOutsideToClose: true
            });
        }

        function toggleComments() {
            vm.isCommentsVisible = !vm.isCommentsVisible;
        }

        function disableSubmit() {
            return !vm.comment || vm.isLoading;
        }

        function submit() {
            var data = {
                commentable_id: vm.content.id,
                commentable_type: 'App\\Post',
                text: vm.comment
            };

            vm.isLoading = true;
            ProfileAPI.comment(data).then(function (response) {
                vm.isLoading = false;
                vm.content.comments.push(response);
                vm.comment = '';
            });
        }
    }

})();