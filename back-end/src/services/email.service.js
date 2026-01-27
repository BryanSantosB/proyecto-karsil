import nodemailer from "nodemailer";
import generarEmailCotizacion from "../utils/cotizacion.html.email.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true solo para 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarCorreoCotizacion({
  cliente,
  origen,
  destino,
  paquete,
  resultado,
}) {

  const html = generarEmailCotizacion({
    cliente,
    origen,
    destino,
    paquete,
    resultado,
  });

  await transporter.sendMail({
    from: `"Karsil Envíos" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,
    to: cliente.email, // cliente
    cc: process.env.EMAIL_USER, // asesoría interna
    subject: "Cotización de tu envío - Karsil",
    html,
  });
}
