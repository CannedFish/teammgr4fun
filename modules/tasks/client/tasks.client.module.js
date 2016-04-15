(function (app) {
  'use strict';

  app.registerModule('tasks', ['core']);
  app.registerModule('tasks.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
