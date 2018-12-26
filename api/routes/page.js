const express = require('express');
const router = express.Router();

const controller = require('../controllers/page');

// Get
router.get('/', controller.pages)
router.get('/:id', controller.pageDetails);

// Post
router.post('/create', controller.pageCreate)

// Put
router.put('/:id/update', controller.pageUpdate);

module.exports = router;
