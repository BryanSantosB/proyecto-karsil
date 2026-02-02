const express = require("express");
const { listarTiposPaquete } = require("../controllers/paquetes.controller");
const router = express.Router();

router.get("/tipos", listarTiposPaquete);

module.exports = router;
