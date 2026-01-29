const express = require("express");
const { enviarEmailContacto } = require("../controllers/correo.controller");
const router = express.Router();


router.post("/contacto", enviarEmailContacto);

module.exports = router;
