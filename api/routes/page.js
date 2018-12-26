const express = require('express');
const router = express.Router();

const controller = require('../controllers/page');

// Get
router.get('/', controller.pages)
router.get('/:id', controller.page_details);

// Post
router.post('/create', controller.page_create)

// Put
router.put('/:id/update', controller.page_update);

module.exports = router;
