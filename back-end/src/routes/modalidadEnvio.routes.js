import express from "express";
import { listarModalidadEnvio } from "../controllers/modalidadEnvio.controller.js";
const router = express.Router();

router.get("/", listarModalidadEnvio);

export default router;