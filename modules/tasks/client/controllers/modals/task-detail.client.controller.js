(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('TaskDetailController', TaskDetailController);

  function TaskDetailController($scope, $uibModalInstance, task, $http, $timeout) {
    var vm = this,
      tmp = {};

    vm.task = angular.copy(task);
    vm.update = __update;
    vm.delete = __delete;
    vm.close = __close;

    function __update() {
      __reset();
      $http.post('/api/task/update/' + task._id, vm.task).then(function (response) {
        vm.modified = false;
        angular.extend(task, response.data);
      });
    }

    vm.DELETE = 'Delete';
    function __delete() {
      if (vm.DELETE === 'Sure?') {
        $timeout.cancel();
        $http.delete('/api/task/delete/' + task._id).then(function (response) {
          $scope.$close({
            action: 'delete',
            status: 'ok'
          });
        });
      } else {
        vm.DELETE = 'Sure?';
        $timeout(function () {
          vm.DELETE = 'Delete';
        }, 5000);
      }
    }

    function __close() {
      $scope.$dismiss('close');
    }

    function __reset() {
      for (var key in vm.editable) {
        if (vm.editable.hasOwnProperty(key) && vm.editable[key]) {
          vm.task[key] = task[key];
          vm.editable[key] = false;
        }
      }
    }

    vm.editable = {
      taskName: false,
      projectBelongs: false,
      description: false,
      value: false,
      pluses: false,
      taskType: false
    };
    vm.modified = false;
    vm.types = ['code', 'document'];
    vm.edit = __edit;
    vm.confirm_edit = __confirm_edit;
    vm.cancel_edit = __cancel_edit;
    vm.add_a_plus = __add_a_plus;

    function __edit(id) {
      vm.editable[id] = true;
    }

    function __confirm_edit(id) {
      vm.editable[id] = false;
      vm.modified = true;
    }

    function __cancel_edit(id) {
      vm.editable[id] = false;
      vm.task[id] = task[id];
    }

    function __add_a_plus() {
      vm.task.pluses.push({
        description: '',
        value: 0
      });
    }
  }
}());
