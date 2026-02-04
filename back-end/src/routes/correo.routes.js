const express = require("express");
const { enviarEmailContacto, enviarNumeroReclamoController } = require("../controllers/correo.controller");
const router = express.Router();

router.post("/contacto", enviarEmailContacto);
router.post("/numeroReclamo", enviarNumeroReclamoController);

module.exports = router;
