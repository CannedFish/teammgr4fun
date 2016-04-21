'use strict';

var path = require('path'),
  _ = require('lodash'),
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

exports.listByStatus = function(req, res) {
  var status = req.taskStatus;
  Task.find({ status: status }).populate('createdBy', 'username').exec(function(err, tasks) {
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
  var task = req.task;
  if (task) {
    task.remove(function (err) {
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
  }
};

exports.update = function(req, res) {
  var task = req.task;
  if (task) {
    task = _.extend(task, req.body);
    task.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.json(task);
    });
  }
};

// Middlewares
exports.taskByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findOne({ _id: id }, function(err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return next(new Error('Failed to load Task ' + id));
    }

    req.task = task;
    next();
  });
};

var statusMap = {
  notstarted: 'Not started',
  inprogress: 'In progress',
  pause: 'Pause',
  completed: 'Completed',
  terminated: 'Terminated'
};

exports.statusTrans = function(req, res, next, status) {
  req.taskStatus = statusMap[status];
  if (!req.taskStatus) {
    return res.status(400).send({
      message: 'Status is invalid'
    });
  }

  next();
};

