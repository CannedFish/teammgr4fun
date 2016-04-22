'use strict';

var tasks = require('../controllers/tasks.server.controller'),
  handling = require('../controllers/task-handle.server.controller.js');

module.exports = function(app) {
  // APIs for basic tasks operations
  app.route('/api/tasks').get(tasks.list);
  app.route('/api/tasks/:status').get(tasks.listByStatus);
  app.route('/api/:userID/tasks').get(tasks.listByAuthor);
  app.route('/api/task/create').post(tasks.create);
  app.route('/api/task/:taskID').get(tasks.populateTaskByID);
  app.route('/api/task/:taskID').delete(tasks.delete);
  app.route('/api/task/:taskID').put(tasks.update);

  // APIs for tasks handling
  app.route('/api/:userID/handling').get(handling.listByResovler);
  app.route('/api/task/handle/:taskID').post(handling.handle);

  // Midwares
  app.param('taskID', tasks.taskByID);
  app.param('status', tasks.statusTrans);
};

