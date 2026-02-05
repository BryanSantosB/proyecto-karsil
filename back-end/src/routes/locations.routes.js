import express from "express";
const router = express.Router();

import {
  listCiudadesOrigen,
} from "../controllers/locations.controller.js";

router.get("/ciudades-origen", listCiudadesOrigen);

export default router;