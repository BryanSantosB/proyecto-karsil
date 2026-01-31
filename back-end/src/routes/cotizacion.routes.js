const express = require("express");
const router = express.Router();
const controller = require("../controllers/cotizacion.controller.js");
const { cotizarEnvio, crearCotizacion } = require("../controllers/cotizacion.controller");

router.post("/", cotizarEnvio);
router.post("/crear", crearCotizacion);


router.post("/", controller.crear);
router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;


module.exports = router;
