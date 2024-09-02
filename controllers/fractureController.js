const Fracture = require("../models/Fracture");

const createFracture = async (request, response) => {
  const { user_id, duration, confidence, solutions, image, startDate } =
    request.body;

  const fracture = new Fracture({
    user_id,
    duration,
    confidence,
    solutions,
    image,
    startDate,
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

const updateFractureDuration = async () => {
  try {
    const fractures = await Fracture.find();
    const now = new Date();

    for (const fracture of fractures) {
      const durationDays = Math.floor(
        (now - new Date(fracture.startDate)) / (1000 * 60 * 60 * 24)
      );
      fracture.duration = durationDays;
      await fracture.save();
    }

    console.log("All fracture durations updated successfully");
  } catch (error) {
    console.error("Error updating fracture durations:", error);
  }
};

module.exports = {
  createFracture,
  getAllFracturesByUserId,
  getFractureById,
  updateFractureDuration,
};
