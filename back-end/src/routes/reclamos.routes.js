const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { crearReclamo } = require("../controllers/reclamos.controller");

console.log("UPLOAD:", upload);
console.log("CONTROLLER:", crearReclamo);

router.post(
  "/",
  upload.array("evidencias", 10),
  crearReclamo
);

module.exports = router;
