const { getHealthStatus } = require("../services/health.service");

exports.healthCheck = (req, res) => {
  const status = getHealthStatus();
  res.json(status);
};
