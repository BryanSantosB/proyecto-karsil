import { crearReclamoService } from "../services/db_services/reclamos.service.js";

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
