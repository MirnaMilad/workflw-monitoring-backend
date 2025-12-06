const express = require('express');
const statsController = require('../controllers/statsController');

const router = express.Router();

router.get('/overview', statsController.getOverview.bind(statsController));
router.get('/timeline', statsController.getTimeline.bind(statsController));
router.get('/anomalies', statsController.getAnomalies.bind(statsController));

module.exports = router;
