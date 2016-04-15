(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('CommittedTasksController', CommittedTasksController);

  CommittedTasksController.$inject = ['$scope', '$http', 'Authentication'];

  function CommittedTasksController($scope, $http, Authentication) {
    var vm = this;

    vm.user = Authentication.user;

    $http.get('/api/' + vm.user._id + '/tasks').success(function(response) {
      vm.tasks = response;
    });
  }
}());
