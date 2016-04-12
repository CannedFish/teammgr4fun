// implement the controller for create task modal
(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('CreateTaskController', CreateTaskController);

  CreateTaskController.$inject = ['$scope'];

  function CreateTaskController($scope) {
    var vm = this;

    $scope.ok = function () {
      $scope.$close($scope.task);
    };

    $scope.cancel = function () {
      $scope.$dismiss('cancel');
    };
  }
}());
