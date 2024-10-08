const express = require("express");
const router = express.Router();
const fractureController = require("../controllers/fractureController");

router.post("/create", fractureController.createFracture);
router.get("/:user_id", fractureController.getAllFracturesByUserId);
router.get("/fractures/:id", fractureController.getFractureById);

module.exports = router;
