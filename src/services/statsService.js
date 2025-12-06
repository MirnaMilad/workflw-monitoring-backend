const { EVENT_TYPES, ANOMALY_TYPES, SEVERITY_LEVELS } = require('../config/constants');
const { TIMELINE_EVENTS_COUNT, ANOMALIES_COUNT } = require('../config/server');

class StatsService {
  generateTimelineEvents() {
    const events = [];
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < TIMELINE_EVENTS_COUNT; i++) {
      const timestamp = new Date(oneDayAgo + Math.random() * (now - oneDayAgo));
      events.push({
        id: `event_${i + 1}`,
        type: EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)],
        timestamp: timestamp.toISOString(),
        workflowId: `WF_${Math.floor(Math.random() * 1000)}`
      });
    }
    
    return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  generateAnomalies() {
    const anomalies = [];
    const now = Date.now();
    
    for (let i = 0; i < ANOMALIES_COUNT; i++) {
      const timestamp = new Date(now - Math.random() * 4 * 60 * 60 * 1000);
      anomalies.push({
        id: `anomaly_${i + 1}`,
        type: ANOMALY_TYPES[Math.floor(Math.random() * ANOMALY_TYPES.length)],
        severity: SEVERITY_LEVELS[Math.floor(Math.random() * SEVERITY_LEVELS.length)],
        timestamp: timestamp.toISOString(),
        description: 'Detected anomaly in workflow processing'
      });
    }
    
    return anomalies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  calculateOverview() {
    const totalWorkflowsToday = Math.floor(Math.random() * 100) + 50;
    const avgCycleTime = (Math.random() * 8 + 2).toFixed(2);
    const slaCompliance = (Math.random() * 15 + 85).toFixed(1);
    const activeAnomalies = Math.floor(Math.random() * 5) + 3;
    
    return {
      totalWorkflowsToday,
      avgCycleTimeHours: parseFloat(avgCycleTime),
      slaCompliancePercent: parseFloat(slaCompliance),
      activeAnomaliesCount: activeAnomalies
    };
  }
}

module.exports = new StatsService();
