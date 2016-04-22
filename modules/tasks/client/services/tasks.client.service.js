(function () {
  'use strict';

  angular
    .module('tasks.services')
    .factory('TasksServices', TasksServices);

  TasksServices.$inject = ['$resource'];

  function TasksServices($resource) {
    return $resource('api/task/:taskID', {
      taskID: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
