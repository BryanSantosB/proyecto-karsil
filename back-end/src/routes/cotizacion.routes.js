const express = require("express");
const router = express.Router();

const { cotizarEnvio, crearCotizacion } = require("../controllers/cotizacion.controller");

router.post("/", cotizarEnvio);
router.post("/crear", crearCotizacion);

module.exports = router;
