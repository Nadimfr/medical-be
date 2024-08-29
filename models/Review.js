const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('review', reviewSchema);
