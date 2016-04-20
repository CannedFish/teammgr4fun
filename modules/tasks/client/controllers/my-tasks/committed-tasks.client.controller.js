(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('CommittedTasksController', CommittedTasksController);

  CommittedTasksController.$inject = ['$scope', '$http', '$uibModal', 'Authentication'];

  function CommittedTasksController($scope, $http, $uibModal, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.detail = detail;
    vm.newTask = newTask;

    // Initialize views
    $http.get('/api/' + vm.user._id + '/tasks').then(function(response) {
      vm.tasks = response.data;
    });

    // Show task details in a modal dialog
    function detail(idx) {
      var detailModal = $uibModal.open({
        scope: $scope,
        templateUrl: 'modules/tasks/client/views/modals/task-detail.client.view.html',
        controller: 'TaskDetailController',
        controllerAs: 'vm',
        resolve: {
          task: function () {
            return vm.tasks[idx];
          }
        }
      });

      detailModal.result.then(function (ret) {
        if (ret.status === 'ok') {
          if (ret.action === 'delete') {
            vm.tasks.splice(idx, 1);
          }
        }
      });
    }

    // Commit a new task
    // TODO: Make this a service
    function newTask() {
      var createTaskModal = $uibModal.open({
        scope: $scope,
        templateUrl: 'modules/tasks/client/views/modals/create_task.client.view.html',
        controller: 'CreateTaskController',
        controllerAs: 'vm',
        show: false
      });

      createTaskModal.result.then(function (task) {
        console.log(task);
        $http.post('/api/task/create', task).then(function(response) {
          vm.tasks.push(response.data);
        });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }
  }
}());
