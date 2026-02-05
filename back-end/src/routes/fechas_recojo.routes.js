import express from "express";
const router = express.Router();

import {
  listFechasRecojo, 
  listarFechas
} from "../controllers/fechas_recojo.controller.js";

router.get("/fechas-recojo", listFechasRecojo);
router.get("/fechas", listarFechas);

export default router;