(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', '$uibModal', 'Authentication'];

  function HomeController($scope, $http, $uibModal, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    $http.get('/api/tasks').success(function(response) {
      $scope.tasks = response;
    });

    // For Create a task
    $scope.createTask = function() {
      var data = {
        taskName: $scope.taskName,
        createdBy: $scope.createdBy,
        projectBelongs: $scope.project,
        description: $scope.description,
        value: $scope.value,
        pluses: $scope.pluses,
        taskType: $scope.taskType,
        status: $scope.status
      };
      $http.post('/api/task/create', data).success(function(response) {
        $scope.tasks.push(response);
        $scope.taskName = '';
        $scope.createdBy = '';
        $scope.project = '';
        $scope.description = '';
        $scope.value = '';
        $scope.pluses = '';
        $scope.taskType = '';
        $scope.status = '';
      });
    };

    $scope.edit = true;
    $scope.showModal = function() {
      var createTaskModal = $uibModal.open({
        scope: $scope,
        templateUrl: 'modules/tasks/client/views/create_task.client.view.html',
        controller: 'CreateTaskController',
        show: false
      });
      // createTaskModal.result.then();
    };
  }
}());
