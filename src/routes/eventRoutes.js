const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', eventController.handleSSE.bind(eventController));

module.exports = router;
