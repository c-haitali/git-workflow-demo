const tasksRouter = require('./tasks');

function registerRoutes(app) {
  app.use(tasksRouter);
}

module.exports = { registerRoutes };
