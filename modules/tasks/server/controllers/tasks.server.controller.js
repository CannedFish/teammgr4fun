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

exports.listByAuthor = function(req, res) {
  var userID = req.params.userID;
  Task.find({ createdBy: userID }).exec(function(err, tasks) {
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

  task.save().then(function() {
    return User.populate(task, { path: 'createdBy', select: 'username' });
  }).then(function(task) {
    res.json(task);
  }).then(null, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
};

exports.delete = function(req, res) {
  var taskID = req.params.taskID;
  Task.remove({ _id: taskID }, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json({
      status: 'ok',
      message: 'A task is removed.'
    });
  });
};

exports.update = function(req, res) {
};

