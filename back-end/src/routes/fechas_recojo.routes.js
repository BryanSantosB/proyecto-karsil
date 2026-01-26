const express = require("express");
const router = express.Router();

const {
  listFechasRecojo,
} = require("../controllers/fechas_recojo.controller");

router.get("/fechas-recojo", listFechasRecojo);

module.exports = router;
