'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function(req, res) {
  Task.find({}, function(err, tasks) {
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
    // createdBy: user.id,
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

    res.json(task);
  });
};

exports.delete = function(req, res) {
};

exports.update = function(req, res) {
};

