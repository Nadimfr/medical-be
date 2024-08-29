const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.post('/create', historyController.createHistory);
router.get('/:userId', historyController.getHistoriesByUserId);
router.get('/:historyId', historyController.getHistoryById);

module.exports = router;
