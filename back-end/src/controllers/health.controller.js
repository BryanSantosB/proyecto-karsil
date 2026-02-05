import { getHealthStatus } from "../services/health.service.js";

export const healthCheck = (req, res) => {
  const status = getHealthStatus();
  res.json(status);
};