import {
  enviarCorreoContacto,
  enviarCorreoNumeroReclamo,
} from "../services/email.service.js";

const SMTP_ENABLED = process.env.SMTP_ENABLED === "true";

export const enviarEmailContacto = catchAsync(async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    throw new AppError("Datos incompletos", 400);
  }

  if(SMTP_ENABLED) {
    await enviarCorreoContacto(fullName, email, phone, message);
  }
  res.status(200).json({ message: "Correo enviado" });
});

export const enviarNumeroReclamoController = catchAsync(async (req, res) => {
  const { correo, numeroReclamo } = req.body;

  if (!correo || !numeroReclamo) {
    throw new AppError("Correo y número de reclamo son obligatorios", 400);
  }

  if(SMTP_ENABLED) {
    await enviarCorreoNumeroReclamo(correo, numeroReclamo);
  }

  return res.status(200).json({
    ok: true,
    mensaje: "Correo con número de reclamo enviado correctamente",
  });
});
