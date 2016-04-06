'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', '$uibModal', 'Authentication',
  function ($scope, $http, $uibModal, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

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
    var createTaskModal = $uibModal.open({
      scope: $scope,
      templateUrl: "modules/tasks/client/views/create_task.client.view.html",
      show: false
    });
    $scope.showModal = function() {
      createTaskModal.$promise.then(createTaskModal.show);
    };
  }
]);
