import nodemailer from "nodemailer";
import generarEmailCotizacion from "../utils/cotizacion.html.email.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
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

export const enviarCorreoContacto = async (
  nombre,
  correo,
  telefono,
  mensaje,
) => {
  
  await transporter.sendMail({
    from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: correo, 
    subject: "Nuevo mensaje desde la web",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      </div>
    `,
  });
};

