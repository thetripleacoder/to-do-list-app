const mongoose = require('mongoose');
// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile Number is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  registeredOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', userSchema);
