import "dotenv/config"; // Carga automática de variables de entorno
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/database.js";

// Importación de rutas (Asegúrate de incluir .js)
import locationsRoutes from "./routes/locations.routes.js";
import healthRoutes from "./routes/health.routes.js";
import fechasRecojoRoutes from "./routes/fechas_recojo.routes.js";
import cotizacionRoutes from "./routes/cotizacion.routes.js";
import correoRoutes from "./routes/correo.routes.js";
import ciudadesRoutes from "./routes/ciudades.routes.js";
import modalidadesEnvioRoutes from "./routes/modalidadEnvio.routes.js";
import tiposPaquetesRoutes from "./routes/paquetes.routes.js";
import reclamosRoutes from "./routes/reclamos.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';



// Configuración para emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://karsil-front.trycloudflare.com",
    "https://karsilcargo.onrender.com"
  ],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


// Middlewares
app.use(express.json());
app.use(cookieParser());

// Archivos estáticos
app.use("/public", express.static(path.join(__dirname, "../src/public")));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use("/api/health", healthRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/fechas", fechasRecojoRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/correo", correoRoutes);
app.use("/api/ciudades", ciudadesRoutes);
app.use("/api/modalidades", modalidadesEnvioRoutes);
app.use("/api/paquetes", tiposPaquetesRoutes);
app.use("/api/reclamos", reclamosRoutes);
app.use("/api/auth", authRoutes);
app.use('/users', userRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Ruta de prueba de BD
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

export default app;