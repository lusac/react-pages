const express = require('express');
const router = express.Router();

const controller = require('../controllers/page');

router.post('/create', controller.page_create)
router.put('/:id/update', controller.page_update);
router.get('/:id', controller.page_details);

module.exports = router;
