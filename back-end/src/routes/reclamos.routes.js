import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
import { crearReclamo, getReclamoById, listarReclamos } from "../controllers/reclamos.controller.js";
import { requirePermission } from "../middlewares/permission.middleware.js";

router.post(
  "/",
  upload.array("evidencias", 10),
  crearReclamo
);

router.get("/:numeroReclamo", getReclamoById);
router.get("/", authMiddleware, requirePermission("USER_READ"), listarReclamos);

export default router;