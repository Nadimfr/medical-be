const Review = require("../models/Review");

const getReviews = (request, response) => {
  Review.find({})
    .then((Review) => {
      return response.status(200).json(Review);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

const getNewestReviews = (request, response) => {
  Review.find({})
    .sort({ date: 1 })
    .then((reviews) => {
      return response.status(200).json(reviews);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

const createReview = async (req, res) => {
  const { name, stars, review } = req.body;

  const newReview = new Review({
    name,
    stars,
    review,
    date: new Date(),
  });

  try {
    const savedReview = await newReview.save();
    return res.status(201).json(savedReview);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getReviews,
  getNewestReviews,
  createReview,
};
