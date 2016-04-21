'use strict';

var path = require('path'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  User = mongoose.model('User'),
  UserTask = mongoose.model('UserTask'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.listByResovler = function(req, res) {
  var userID = req.params.userID;
  UserTask.find({
    resolvers: {
      $elemMatch: { user: userID }
    }
  }).exec(function (err, tasks) {
    var opts = [
      { path: 'resolvers.user', select: 'username' },
      { path: 'task' }
    ];
    UserTask.populate(tasks, opts).then(function (tasks) {
      res.json(tasks);
    }, function(err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  });
};

exports.handle = function(req, res) {
  var task = req.task;
  if (task) {
    var handleTask = new UserTask(req.body);
    handleTask.save().then(function() {
      task.status = 'In progress';
      task.updated = Date.now();
      return task.save();
    }).then(function() {
      res.json({
        status: 'OK',
        msg: 'A task is in progress.'
      });
    }).then(null, function(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

