'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };

    // for skills
    $scope.exps = ['Beginner', 'General', 'Skilled', 'Proficiency'];
    if(typeof($scope.user.skills) === 'undefined' || $scope.user.skills.length === 0) {
      $scope.user.skills = [{skillName: '', exp: ''}];
    }

    // for project experience
    if(typeof($scope.user.projectExp) === 'undefined' || $scope.user.projectExp.length === 0) {
      $scope.user.projectExp = [{projectName: '', description: '', skillUsed: []}];
    }
  }
]);
