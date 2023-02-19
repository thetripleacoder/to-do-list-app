const mongoose = require('mongoose');
// Task Schema

const stepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'step name is required'],
  }, addedOn: {
    type: Date,
    default: new Date(),
  },
});
const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User Id is required'],
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },description: {
    type: String,
  },steps: {
    type: [stepSchema],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  completedOn: {
    type: Date,
    default: new Date(),
  },
});



module.exports = mongoose.model('Task', taskSchema);
