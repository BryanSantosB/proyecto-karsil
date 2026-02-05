import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requirePermission } from "../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authMiddleware, requirePermission("USER_READ"), (req, res) => {
  res.json({ message: "Usuarios obtenidos" });
});

export default router;
