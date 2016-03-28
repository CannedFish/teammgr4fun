'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // User = mongoose.model('User'),
  Task = mongoose.model('Task');

/**
 * User value
 */
var UserValue = new Schema({
  userID: {
    type: String,
    trim: true,
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
  taskID: {
    type: String,
    trim: true,
    required: 'Please fill in a task ID'
  },
  userID: {
    type: [UserValue],
    required: true
  },
  startDate: {
    type: Date,
    required: 'Please fill in the start Date'
  },
  completeDate: {
    type: Date,
    required: 'Please fill in the complete Date'
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

