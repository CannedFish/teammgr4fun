(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication'];

  function EditProfileController($scope, $http, $location, Users, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new Users(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }

    // for skills
    $scope.exps = ['Beginner', 'General', 'Skilled', 'Proficiency'];
    $scope.add_a_skill = function() {
      if (typeof vm.user.skills === 'undefined')
        vm.user.skills = [];
      vm.user.skills.push({ skillName: '', exp: 'Beginner' });
    };
    $scope.remove_a_skill = function($idx) {
      vm.user.skills.splice($idx, 1);
    };

    // for project experience
    $scope.add_a_projexp = function() {
      if (typeof vm.user.projectExp === 'undefined')
        vm.user.projectExp = [];
      vm.user.projectExp.push({ projectName: '', description: '', skillUsed: [] });
    };
    $scope.remove_a_projexp = function($idx) {
      vm.user.projectExp.splice($idx, 1);
    };

  }
}());
