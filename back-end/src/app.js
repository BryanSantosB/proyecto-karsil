require("dotenv").config();
console.log("¿Variable de puerto detectada?:", process.env.EMAIL_HOST);
const express = require("express");
const cors = require("cors");
const path = require("path");

const locationsRoutes = require("./routes/locations.routes");
const healthRoutes = require("./routes/health.routes");
const fechasRecojoRoutes = require("./routes/fechas_recojo.routes");
const cotizacionRoutes = require("./routes/cotizacion.routes");
const correoRoutes = require("./routes/correo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "../src/public")));

// routes
app.use("/api/health", healthRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/fechas", fechasRecojoRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/correo", correoRoutes);


module.exports = app;
