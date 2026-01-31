const ciudadesService = require("../services/db_services/ciudades.service.js");

/**
 * GET /ciudades
 */
async function listar(req, res) {
  try {
    const ciudades = await ciudadesService.obtenerCiudades();
    res.json({ ok: true, data: ciudades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener ciudades" });
  }
}

/**
 * GET /ciudades/:id
 */
async function obtenerPorId(req, res) {
  try {
    const ciudad = await ciudadesService.obtenerCiudadPorId(req.params.id);

    if (!ciudad) {
      return res.status(404).json({
        ok: false,
        message: "Ciudad no encontrada",
      });
    }

    res.json({ ok: true, data: ciudad });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al obtener ciudad" });
  }
}

/**
 * GET /ciudades/departamento/:departamentoId
 */
async function listarPorDepartamento(req, res) {
  try {
    const ciudades =
      await ciudadesService.obtenerCiudadesPorDepartamento(
        req.params.departamentoId
      );

    res.json({ ok: true, data: ciudades });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener ciudades por departamento",
    });
  }
}

module.exports = {
  listar,
  obtenerPorId,
  listarPorDepartamento,
};
