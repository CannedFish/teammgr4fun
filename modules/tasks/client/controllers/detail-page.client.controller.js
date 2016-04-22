(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('DetailPageController', DetailPageController);

  DetailPageController.$inject = ['$scope', 'taskResolve', 'TasksServices'];

  function DetailPageController($scope, task, TasksServices) {
    var vm = this;

    vm.task = task;
  }
}());
