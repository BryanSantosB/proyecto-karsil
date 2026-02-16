import { calcularEnvio } from "../services/cotizacion.service.js";
import { enviarCorreoCotizacion } from "../services/email.service.js";
import * as cotizacionesService from "../services/db_services/cotizaciones.service.js";

const SMTP_ENABLED = process.env.SMTP_ENABLED === "true";

export const cotizarEnvio = (req, res) => {
  try {
    const resultado = calcularEnvio(req.body);

    if (resultado.error) {
      return res.status(400).json(resultado);
    }

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al calcular cotización" });
  }
};

export const crearCotizacion = async (req, res) => {
  try {
    const data = req.body;

    // 1. calcular cotización (fuente de verdad)
    const resultado = calcularEnvio(data);

    // 2. enviar correo con precios
    if(SMTP_ENABLED) {
      await enviarCorreoCotizacion({
        cliente: data.contacto,
        origen: data.origen,
        destino: data.destino,
        paquete: data.paquete,
        resultado,
      });
    }

    // 3. responder al front
    res.json({
      ok: true,
      total: resultado.total,
      mensaje: "Cotización enviada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: "Error al procesar la cotización",
    });
  }
};

/**
 * POST /cotizaciones
 */
export async function crear(req, res) {
  try {
    const cotizacion = await cotizacionesService.crearCotizacion(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cotización" });
  }
}

/**
 * GET /cotizaciones
 */
export async function listar(req, res) {
  try {
    const cotizaciones = await cotizacionesService.obtenerCotizaciones();
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cotizaciones" });
  }
}

/**
 * GET /cotizaciones/:id
 */
export async function obtenerPorId(req, res) {
  try {
    const cotizacion = await cotizacionesService.obtenerCotizacionPorId(
      req.params.id,
    );

    if (!cotizacion) {
      return res.status(404).json({ error: "Cotización no encontrada" });
    }

    res.json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cotización" });
  }
}

/**
 * PUT /cotizaciones/:id
 */
export async function actualizar(req, res) {
  try {
    const cotizacion = await cotizacionesService.actualizarCotizacion(
      req.params.id,
      req.body,
    );

    if (!cotizacion) {
      return res.status(404).json({ error: "Cotización no encontrada" });
    }

    res.json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cotización" });
  }
}

/**
 * DELETE /cotizaciones/:id
 */
export async function eliminar(req, res) {
  try {
    const eliminado = await cotizacionesService.eliminarCotizacion(
      req.params.id,
    );

    if (!eliminado) {
      return res.status(404).json({ error: "Cotización no encontrada" });
    }

    res.json({ message: "Cotización eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cotización" });
  }
}
