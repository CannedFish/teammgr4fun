'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // User = mongoose.model('User'),
  Task = mongoose.model('Task');

/**
 * User value
 */
var UserValue = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please fill in a user ID'
  },
  valueOwned: {
    type: Number,
    required: 'Please fill in the value in possession'
  }
});

/**
 * UserTask Schema
 */
var UserTaskSchema = new Schema({
  task: {
    type: Schema.ObjectId,
    ref: 'Task',
    required: 'Please fill in a task ID'
  },
  resolvers: {
    type: [UserValue],
    required: true
  },
  startDate: {
    type: Date,
    required: 'Please fill in the start Date'
  },
  dueDate: {
    type: Date,
    required: 'Please fill in the due Date'
  },
  completeDate: {
    type: Date
  },
  currentValue: {
    type: Number,
    required: 'Please fill in the current value'
  }
});

// Get tasks belongs to a user
UserTaskSchema.statics.findTasksByUserEmail = function(email, callback) {
};

mongoose.model('UserTask', UserTaskSchema);

