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
  }
}());
