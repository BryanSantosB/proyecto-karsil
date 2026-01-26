const express = require("express");
const router = express.Router();

const { cotizarEnvio } = require("../controllers/cotizacion.controller");

router.post("/", cotizarEnvio);

module.exports = router;
