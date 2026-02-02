const express = require("express");
const router = express.Router();

const {
  listFechasRecojo, listarFechas
} = require("../controllers/fechas_recojo.controller");

router.get("/fechas-recojo", listFechasRecojo);
router.get("/fechas", listarFechas);

module.exports = router;
