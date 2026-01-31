const express = require("express");
const router = express.Router();
const controller = require("../controllers/ciudades.controller");

router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);
router.get("/departamento/:departamentoId", controller.listarPorDepartamento);

module.exports = router;
