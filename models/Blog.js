const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  paragraph: {
    type: String,
    min: 2,
    max: 100,
    unique: false,
  },
  author: {
    type: String,
    min: 2,
    max: 40,
    unique: false,
  },
  date: {
    type: Date,
    unique: false,
  },
  image: {
    type: String,
    min: 2,
    max: 100,
    unique: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
