import express from "express";
const router = express.Router();
import * as controller from "../controllers/ciudades.controller.js";

router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);
router.get("/departamento/:departamentoId", controller.listarPorDepartamento);

export default router;