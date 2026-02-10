import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
import { crearReclamo, getReclamoById, listarEstadosReclamos, listarMotivosReclamos, listarReclamos, updateGestion } from "../controllers/reclamos.controller.js";
import { requirePermission } from "../middlewares/permission.middleware.js";
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

router.post(
  "/",
  upload.array("evidencias", 10),
  optionalAuth,
  crearReclamo
);

router.get("/", authMiddleware, requirePermission("USER_READ"), listarReclamos);
router.get("/estados", listarEstadosReclamos);
router.get("/motivos", listarMotivosReclamos);
router.put(
  "/:reclamoId/gestion",
  authMiddleware,
  requirePermission("USER_UPDATE"),
  // roleMiddleware(["admin", "trabajador"]),
  updateGestion
);
router.get("/:numeroReclamo", getReclamoById);


export default router;