(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('HandlingTasksController', HandlingTasksController);

  HandlingTasksController.$inject = ['$scope', 'Authentication'];

  function HandlingTasksController($scope, Authentication) {
    var vm = this;
  }
}());
