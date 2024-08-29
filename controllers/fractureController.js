const Fracture = require("../models/Fracture");

const createFracture = async (request, response) => {
  const { user_id, duration, confidence } = request.body;

  const fracture = new Fracture({
    user_id,
    duration,
    confidence,
  });
  await fracture.save();

  return response.status(200).json(fracture);
};

const getAllFracturesByUserId = (request, response) => {
  const { user_id } = request.params;

  Fracture.find({ user_id: user_id })
    .sort({ date: -1 })
    .then((j) => {
      return response.status(200).json(j);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

const getFractureById = (request, response) => {
  Fracture.findById(request.params.id)
    .then((fracture) => {
      return response.status(200).json(fracture);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

module.exports = {
  createFracture,
  getAllFracturesByUserId,
  getFractureById,
};
