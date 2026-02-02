const express = require("express");
const { listarModalidadEnvio } = require("../controllers/modalidadEnvio.controller");
const router = express.Router();


router.get("/", listarModalidadEnvio);

module.exports = router;
