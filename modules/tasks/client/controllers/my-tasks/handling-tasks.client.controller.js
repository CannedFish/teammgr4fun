(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('HandlingTasksController', HandlingTasksController);

  HandlingTasksController.$inject = ['$scope', '$http', 'Authentication'];

  function HandlingTasksController($scope, $http, Authentication) {
    var vm = this;

    vm.user = Authentication.user;

    $http.get('/api/' + vm.user._id + '/handling').then(function (response) {
      vm.tasks = response.data;
    });
  }
}());
