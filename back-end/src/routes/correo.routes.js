import express from "express";
import { enviarEmailContacto, enviarNumeroReclamoController } from "../controllers/correo.controller.js";
const router = express.Router();

router.post("/contacto", enviarEmailContacto);
router.post("/numeroReclamo", enviarNumeroReclamoController);

export default router;