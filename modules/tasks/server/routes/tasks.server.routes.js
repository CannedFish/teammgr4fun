'use strict';

var tasks = require('../controllers/tasks.server.controller');

module.exports = function(app) {
  app.route('/api/tasks').get(tasks.list);
  app.route('/api/:userID/tasks').get(tasks.listByAuthor);

  app.route('/api/task/create')
    .post(tasks.create);
};

