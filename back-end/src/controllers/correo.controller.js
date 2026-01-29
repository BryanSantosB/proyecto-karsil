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