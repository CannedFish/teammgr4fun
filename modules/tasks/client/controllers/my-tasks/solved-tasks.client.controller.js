(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('SolvedTasksController', SolvedTasksController);

  SolvedTasksController.$inject = ['$scope', 'Authentication'];

  function SolvedTasksController($scope, Authentication) {
    var vm = this;
  }
}());
