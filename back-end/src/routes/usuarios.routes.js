import express from "express";
import { listarTrabajadores } from "../controllers/usuarios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requirePermission } from "../middlewares/permission.middleware.js";
const router = express.Router();

router.get(
  "/trabajadores",
  authMiddleware,
  requirePermission("USER_READ"),
  listarTrabajadores,
);
export default router;
