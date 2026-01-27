import { calcularEnvio } from "../services/cotizacion.service.js";
import { enviarCorreoCotizacion } from "../services/email.service.js";

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
    await enviarCorreoCotizacion({
      cliente: data.contacto,
      origen: data.origen,
      destino: data.destino,
      paquete: data.paquete,
      resultado,
    });

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
