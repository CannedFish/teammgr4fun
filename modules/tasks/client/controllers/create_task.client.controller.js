// implement the controller for create task modal
(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('CreateTaskController', CreateTaskController);

  CreateTaskController.$inject = ['$scope', 'Authentication'];

  function CreateTaskController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;

    $scope.ok = function () {
      $scope.$close($scope.task);
    };

    $scope.cancel = function () {
      $scope.$dismiss('cancel');
    };

    $scope.task = {
      status: 'Not started',
      createdBy: vm.user._id,
      pluses: []
    };
    $scope.types = ['code', 'document'];

    $scope.add_a_plus = function () {
      $scope.task.pluses.push({
        description: '',
        value: 0
      });
    };
  }
}());
