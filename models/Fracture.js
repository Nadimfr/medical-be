const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  duration: Number,
  solution: String,
});

const fractureSchema = new mongoose.Schema({
  user_id: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  duration: {
    type: Number,
    default: 0,
  },
  confidence: {
    type: Number,
    unique: false,
  },
  solutions: [solutionSchema],
  image: {
    type: String,
    min: 2,
    max: 1000,
    unique: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fracture", fractureSchema);
