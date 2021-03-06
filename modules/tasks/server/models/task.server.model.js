'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Task Pluses
 */
var TaskPluses = new Schema({
  description: {
    type: String,
    required: 'Please fill in a description'
  },
  value: {
    type: Number,
    required: 'Please fill in a value of this task'
  }
});

/**
 * Task Schema
 */
var TaskSchema = new Schema({
  taskName: {
    type: String,
    trim: true,
    required: 'Please fill in a taskname'
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please fill in a user ID'
  },
  projectBelongs: {
    type: String,
    trim: true,
    default: '--'
  },
  updated: {
    type: Date
  },
  description: {
    type: String,
    required: 'Please fill in a description'
  },
  value: {
    type: Number,
    required: 'Please fill in a value of this task'
  },
  pluses: [TaskPluses],
  taskType: {
    type: String,
    trim: true,
    enum: ['code', 'document'],
    default: 'code'
  },
  status: {
    type: String,
    trim: true,
    enum: ['', 'Not started', 'In progress', 'Pause', 'Completed', 'Terminated'],
    default: 'Not started'
  }
});

mongoose.model('Task', TaskSchema);

