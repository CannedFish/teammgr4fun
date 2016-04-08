// implement the controller for create task modal
(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('CreateTaskController', CreateTaskController);

  CreateTaskController.$inject = ['$scope'];

  function CreateTaskController($scope, $uibModalInstance) {
    var vm = this;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
