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
        templateUrl: 'modules/tasks/client/views/my-tasks/committed-tasks.client.view.html',
        controller: 'CommittedTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Committed Tasks'
        }
      })
      .state('mine.handling', {
        url: '/handling',
        templateUrl: 'modules/tasks/client/views/my-tasks/handling-tasks.client.view.html',
        controller: 'HandlingTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Handling Tasks'
        }
      })
      .state('mine.solved', {
        url: '/solved',
        templateUrl: 'modules/tasks/client/views/my-tasks/solved-tasks.client.view.html',
        controller: 'SolvedTasksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Solved Tasks'
        }
      })
      .state('detail', {
        url: '/task/:taskID',
        templateUrl: 'modules/tasks/client/views/detail-page.client.view.html',
        controller: 'DetailPageController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {
          pageTitle: '{{ taskResolve.taskName }}'
        }
      });
  }

  getTask.$inject = ['$stateParams', 'TasksServices'];

  function getTask($stateParams, TasksServices) {
    return TasksServices.get({
      taskID: $stateParams.taskID
    }).$promise;
  }
}());
