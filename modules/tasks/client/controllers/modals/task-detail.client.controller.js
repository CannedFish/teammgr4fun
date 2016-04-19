(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('TaskDetailController', TaskDetailController);

  function TaskDetailController($scope, $uibModalInstance, task, $http, $timeout) {
    var vm = this;

    vm.task = task;
    vm.update = __update;
    vm.delete = __delete;
    vm.close = __close;

    function __update() {
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

    vm.editable = {
      taskname: false,
      project: false,
      description: false,
      value: false,
      pluses: false,
      tasktype: false
    };
    vm.modified = false;
    vm.types = ['code', 'document'];
    vm.edit = __edit;
    vm.confirm_edit = __confirm_edit;
    vm.cancel_edit = __cancel_edit;

    function __edit(id) {
      vm.editable[id] = true;
    }

    function __confirm_edit(id) {
      vm.editable[id] = false;
      vm.modified = true;
    }

    function __cancel_edit(id) {
      vm.editable[id] = false;
    }
  }
}());
