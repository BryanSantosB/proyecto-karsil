import {
  crearReclamoService,
  obtenerReclamoPorNumero,
} from "../services/db_services/reclamos.service.js";

export const crearReclamo = async (req, res) => {
  try {
    const resultado = await crearReclamoService(req.body, req.files);

    res.status(201).json({
      mensaje: "Reclamo registrado correctamente",
      numeroReclamo: resultado.numeroReclamo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar el reclamo",
    });
  }
};

export const getReclamoById = async (req, res) => {
  try {
    const { numeroReclamo } = req.params;

    if (!numeroReclamo) {
      return res.status(400).json({
        ok: false,
        message: "Número de reclamo requerido",
      });
    }

    const reclamo = await obtenerReclamoPorNumero(numeroReclamo);

    if (!reclamo) {
      return res.status(404).json({
        ok: false,
        message: "Reclamo no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      data: reclamo,
    });
  } catch (error) {
    console.error("Error al obtener reclamo:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
