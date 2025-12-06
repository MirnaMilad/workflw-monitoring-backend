const express = require('express');
const { PORT } = require('./config/server');
const setupMiddleware = require('./middleware');
const setupRoutes = require('./routes');
const eventService = require('./services/eventService');

const app = express();

setupMiddleware(app);
setupRoutes(app);
app.listen(PORT, () => {
  console.log(`🚀 Workflow Monitoring Backend running on port ${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/stats/overview`);
  console.log(`   GET  http://localhost:${PORT}/stats/timeline`);
  console.log(`   GET  http://localhost:${PORT}/stats/anomalies`);
  console.log(`   SSE  http://localhost:${PORT}/events`);
  console.log(`\n🔄 Broadcasting real-time events every 10-20 seconds...\n`);
  
  eventService.startBroadcasting();
});
process.on('SIGINT', () => {
  console.log('\n⏹️  Stopping event broadcaster...');
  eventService.stopBroadcasting();
  process.exit(0);
});
