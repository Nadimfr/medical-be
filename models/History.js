const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: false,
  },
  user_id: {
    type: String,
    min: 2,
    max: 1000,
    required: true,
  },
  recommendations: [
    {
      title: {
        type: String,
        required: true,
      },
      emotion_type: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },

      details: [
        {
          title: {
            type: String,
          },
          image_file: {
            type: String,
          },
        },
      ],
    },
  ],
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('History', historySchema);
