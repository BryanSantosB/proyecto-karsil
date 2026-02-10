import {
  crearReclamoService,
  getAllEstadosReclamo,
  getAllMotivosReclamo,
  getAllReclamos,
  obtenerReclamoPorNumero,
  updateGestionReclamo,
} from "../services/db_services/reclamos.service.js";

export const crearReclamo = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const resultado = await crearReclamoService(req.body, req.files, userId);
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

export const listarReclamos = async (req, res) => {
  try {
    const reclamos = await getAllReclamos();
    res.json(reclamos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reclamos' });
  }
};

export const listarEstadosReclamos = async (req, res) => {
  try {
    const estadosReclamos = await getAllEstadosReclamo();
    res.json(estadosReclamos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estados de reclamos' });
  }
};

export const listarMotivosReclamos = async (req, res) => {
  try {
    const motivosReclamos = await getAllMotivosReclamo();
    res.json(motivosReclamos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener motivos de reclamos' });
  }
};

export const updateGestion = async (req, res) => {
  try {
    const { reclamoId } = req.params;
    const { estado, asignado_a, observaciones_internas } = req.body;

    if (!estado) {
      return res.status(400).json({
        message: "El estado es obligatorio",
      });
    }

    await updateGestionReclamo(reclamoId, {
      estado,
      asignado_a,
      observaciones_internas,
    });

    res.json({
      message: "Gestión del reclamo actualizada correctamente",
    });
  } catch (error) {
    console.error("Error actualizando gestión:", error.message);

    res.status(400).json({
      message: error.message || "Error al actualizar la gestión",
    });
  }
};


