const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  last_name: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  email: {
    type: String,
    min: 2,
    max: 40,
    unique: true,
  },
  password: {
    type: String,
    min: 2,
    max: 40,
    unique: true,
  },
  code: {
    type: String,
    min: 2,
    max: 40,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);
