require("dotenv").config();
console.log("¿Variable de puerto detectada?:", process.env.EMAIL_HOST);
const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./config/database.js");

const locationsRoutes = require("./routes/locations.routes");
const healthRoutes = require("./routes/health.routes");
const fechasRecojoRoutes = require("./routes/fechas_recojo.routes");
const cotizacionRoutes = require("./routes/cotizacion.routes");
const correoRoutes = require("./routes/correo.routes");
const ciudadesRoutes = require("./routes/ciudades.routes");
const modalidadesEnvioRoutes = require("./routes/modalidadEnvio.routes");
const tiposPaquetesRoutes = require("./routes/paquetes.routes");
const reclamosRoutes = require("./routes/reclamos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: [
    "https://karsil-front.trycloudflare.com",
    "http://localhost:3000"
  ],
  credentials: true
}));


app.use("/public", express.static(path.join(__dirname, "../src/public")));

// routes
app.use("/api/health", healthRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/fechas", fechasRecojoRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/correo", correoRoutes);
app.use("/api/ciudades", ciudadesRoutes);
app.use("/api/modalidades", modalidadesEnvioRoutes);
app.use("/api/paquetes", tiposPaquetesRoutes);
app.use("/api/reclamos", reclamosRoutes);


// PRUEBA
app.get("/prueba", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      ok: true,
      dbTime: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error en BD" });
  }
});


module.exports = app;
