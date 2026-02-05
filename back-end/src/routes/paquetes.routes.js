import express from "express";
import { listarTiposPaquete } from "../controllers/paquetes.controller.js";
const router = express.Router();

router.get("/tipos", listarTiposPaquete);

export default router;