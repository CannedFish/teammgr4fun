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

    $scope.showModal = function() {
      var createTaskModal = $uibModal.open({
        scope: $scope,
        templateUrl: 'modules/tasks/client/views/create_task.client.view.html',
        controller: 'CreateTaskController',
        show: false
      });

      createTaskModal.result.then(function (task) {
        console.log(task);
        $http.post('/api/task/create', task).success(function(response) {
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
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }
}());
