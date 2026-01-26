const express = require("express");
const router = express.Router();

const {
  listCiudadesOrigen,
} = require("../controllers/locations.controller");

router.get("/ciudades-origen", listCiudadesOrigen);

module.exports = router;
