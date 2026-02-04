import { enviarCorreoContacto } from "../services/email.service.js";

export const enviarEmailContacto = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  try {
    await enviarCorreoContacto(fullName, email, phone, message);
    res.status(200).json({ message: "Correo enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

export const enviarNumeroReclamoController = async (req, res) => {
  try {
    const { correo, numeroReclamo } = req.body;

    if (!correo || !numeroReclamo) {
      return res.status(400).json({
        ok: false,
        mensaje: "El correo y el número de reclamo son obligatorios",
      });
    }

    await enviarCorreoNumeroReclamo(correo, numeroReclamo);

    return res.status(200).json({
      ok: true,
      mensaje: "Correo con número de reclamo enviado correctamente",
    });

  } catch (error) {
    console.error("Error al enviar correo de número de reclamo:", error);

    return res.status(500).json({
      ok: false,
      mensaje: "Error interno al enviar el correo",
    });
  }
};
