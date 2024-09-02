const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  duration: {
    type: Number,
    unique: false,
    index: true,
  },
  solution: {
    type: String,
    unique: false,
  },
});

module.exports = mongoose.model("Solution", solutionSchema);
