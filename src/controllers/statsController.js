const statsService = require('../services/statsService');

class StatsController {
  getOverview(req, res) {
    try {
      const overview = statsService.calculateOverview();
      res.json(overview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch overview stats' });
    }
  }

  getTimeline(req, res) {
    try {
      const timeline = statsService.generateTimelineEvents();
      res.json({ events: timeline });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch timeline events' });
    }
  }

  getAnomalies(req, res) {
    try {
      const anomalies = statsService.generateAnomalies();
      res.json({ anomalies });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch anomalies' });
    }
  }
}

module.exports = new StatsController();
