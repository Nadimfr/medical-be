const Solution = require("../models/Solution");

const getSolutionsByDuration = (request, response) => {
  const duration = parseInt(request.params.duration, 10);
  console.log(`Requested duration: ${duration}`); // Debugging

  Solution.aggregate([
    { $match: { duration: duration } },
    { $sample: { size: 5 } },
  ])
    .then((solutions) => {
      console.log(`Solutions found: ${JSON.stringify(solutions)}`); // Debugging
      return response.status(200).json(solutions);
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`); // Debugging
      return response.status(500).json({ error: error.message });
    });
};

const getSolutions = (request, response) => {
  Solution.find({})
    .then((solutions) => {
      return response.status(200).json(solutions);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

module.exports = {
  getSolutionsByDuration,
  getSolutions,
};
