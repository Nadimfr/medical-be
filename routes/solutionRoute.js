const express = require("express");
const router = express.Router();
const solutionController = require("../controllers/solutionController");

router.get("/:duration", solutionController.getSolutionsByDuration);
router.get("/", solutionController.getSolutions);

module.exports = router;
