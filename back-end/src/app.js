const express = require("express");
const cors = require("cors");

const locationsRoutes = require("./routes/locations.routes");
const healthRoutes = require("./routes/health.routes");
const fechasRecojoRoutes = require("./routes/fechas_recojo.routes");
const cotizacionRoutes = require("./routes/cotizacion.routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/health", healthRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/fechas", fechasRecojoRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);


module.exports = app;
