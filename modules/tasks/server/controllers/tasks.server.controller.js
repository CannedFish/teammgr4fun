'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function(req, res) {
  Task.find().populate('createdBy', 'username').exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(tasks);
  });
};

exports.create = function(req, res) {
  var task = new Task({
    taskName: req.body.taskName,
    createdBy: req.body.createdBy,
    projectBelongs: req.body.projectBelongs,
    description: req.body.description,
    value: req.body.value,
    pluses: req.body.pluses,
    taskType: req.body.taskType,
    status: req.body.status
  });
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    User.findById(task.createdBy, function(err, user) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      task.createdBy = user.username;
      res.json(task);
    });
  });
};

exports.delete = function(req, res) {
};

exports.update = function(req, res) {
};

