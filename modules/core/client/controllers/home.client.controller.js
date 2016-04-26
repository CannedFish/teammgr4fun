(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', '$state', '$uibModal', 'Authentication', 'UserNotLogin'];

  function HomeController($scope, $http, $state, $uibModal, Authentication, UserNotLogin) {
    var vm = this;

    $http.get('/api/tasks/notstarted').then(function(response) {
      vm.tasks = response.data;
    });

    vm.user = Authentication.user;
    vm.showModal = showModal;
    vm.handle = handle;
    vm.login = !!vm.user;
    vm.detail = detail;

    function showModal() {
      if (!vm.user) {
        UserNotLogin.hint();
      } else {
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

    function handle(idx) {
      var task = vm.tasks[idx],
        data = {
          task: task._id,
          resolvers: [
            { user: vm.user._id, valueOwned: task.value }
          ],
          startDate: Date.now(),
          dueDate: Date.now(),
          currentValue: task.value
        };
      $http.post('/api/task/handle/' + task._id, data).then(function(response) {
        vm.tasks.splice(idx, 1);
      });
    }

    function detail(idx) {
      var taskID = vm.tasks[idx]._id;
      $state.go('detail', { taskID: taskID });
    }
  }
}());
