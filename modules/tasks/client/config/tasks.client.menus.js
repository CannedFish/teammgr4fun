(function () {
  'use strict';

  angular
    .module('tasks')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'My tasks',
      state: 'mine',
      type: 'dropdown',
      position: -1
    });

    menuService.addSubMenuItem('topbar', 'mine', {
      title: 'Commited Tasks',
      state: 'mine.committed'
    });

    menuService.addSubMenuItem('topbar', 'mine', {
      title: 'Handling Tasks',
      state: 'mine.handling'
    });

    menuService.addSubMenuItem('topbar', 'mine', {
      title: 'Solved Tasks',
      state: 'mine.solved'
    });
  }
}());
