const mongoose = require('mongoose');

const fractureSchema = new mongoose.Schema({
  user_id: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  duration: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  confidence: {
    type: Number,
    unique: false,
  },
});

module.exports = mongoose.model('Fracture', fractureSchema);
