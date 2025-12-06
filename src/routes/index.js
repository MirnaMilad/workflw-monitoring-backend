const statsRoutes = require('./statsRoutes');
const eventRoutes = require('./eventRoutes');

const setupRoutes = (app) => {
  app.use('/stats', statsRoutes);
  app.use('/events', eventRoutes);
};

module.exports = setupRoutes;
