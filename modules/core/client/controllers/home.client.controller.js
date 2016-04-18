(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', '$uibModal', 'Authentication', 'UserNotLogin'];

  function HomeController($scope, $http, $uibModal, Authentication, UserNotLogin) {
    var vm = this;
    vm.authentication = Authentication;

    $http.get('/api/tasks').then(function(response) {
      $scope.tasks = response.data;
    });

    $scope.showModal = function() {
      if (!vm.authentication.user) {
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
            $scope.tasks.push(response);
          });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }
    };
  }
}());
