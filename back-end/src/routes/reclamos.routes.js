import express from "express";
const router = express.Router();

import upload from "../config/multer.js";
import { crearReclamo, getReclamoById } from "../controllers/reclamos.controller.js";

router.post(
  "/",
  upload.array("evidencias", 10),
  crearReclamo
);

router.get("/:numeroReclamo", getReclamoById);

export default router;