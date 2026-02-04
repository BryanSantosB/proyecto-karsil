import { Resend } from "resend";
import generarEmailCotizacion from "../utils/cotizacion.html.email.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_INTERNAL = process.env.EMAIL_INTERNAL;

/* =========================
   COTIZACIÓN
========================= */
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

  await resend.emails.send({
    from: EMAIL_FROM,
    to: cliente.email,
    cc: EMAIL_INTERNAL,
    subject: "Cotización de tu envío - Karsil",
    html,
  });
}

/* =========================
   CONTACTO WEB
========================= */
export const enviarCorreoContacto = async (
  nombre,
  correo,
  telefono,
  mensaje
) => {
  await resend.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_INTERNAL,
    reply_to: correo,
    subject: "Nuevo mensaje desde la web",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
        <hr />
        <p>${mensaje}</p>
      </div>
    `,
  });
};

/* =========================
   NÚMERO DE RECLAMO
========================= */
export const enviarCorreoNumeroReclamo = async (
  correo,
  numeroReclamo
) => {
  await resend.emails.send({
    from: EMAIL_FROM,
    to: correo,
    subject: "Confirmación de registro de reclamo",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px;">
          <h2>Reclamo registrado con éxito</h2>
          <p>Tu número de reclamo es:</p>
          <div style="font-size: 20px; font-weight: bold; color: #007bff;">
            ${numeroReclamo}
          </div>
        </div>
      </div>
    `,
  });
};
