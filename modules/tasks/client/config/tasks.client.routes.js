(function () {
  'use strict';

  angular
    .module('tasks.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mine', {
        abstract: true,
        url: '/mine',
        template: '<ui-view/>'
      })
      .state('mine.committed', {
        url: '/committed',
        templateUrl: 'modules/tasks/client/views/committed-tasks.client.view.html',
        controller: 'CommittedTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Committed Tasks'
        }
      })
      .state('mine.handling', {
        url: '/handling',
        templateUrl: 'modules/tasks/client/views/handling-tasks.client.view.html',
        controller: 'HandlingTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Handling Tasks'
        }
      })
      .state('mine.solved', {
        url: '/solved',
        templateUrl: 'modules/tasks/client/views/solved-tasks.client.view.html',
        controller: 'SolvedTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Solved Tasks'
        }
      });
  }
}());
