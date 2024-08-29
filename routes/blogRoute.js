const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

module.exports = router;
