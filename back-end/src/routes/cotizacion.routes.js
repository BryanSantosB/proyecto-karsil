import express from "express";
const router = express.Router();
import * as controller from "../controllers/cotizacion.controller.js";
import { cotizarEnvio, crearCotizacion } from "../controllers/cotizacion.controller.js";

router.post("/", cotizarEnvio);
router.post("/crear", crearCotizacion);

router.post("/", controller.crear);
router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;