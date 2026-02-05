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

export const enviarCorreoNumeroReclamo = async (correo, numeroReclamo) => {
  await transporter.sendMail({
    from: `"Karsil Cargo" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: "Confirmación de registro de reclamo",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
          
          <h2 style="color: #333;">Reclamo registrado con éxito</h2>
          
          <p>Hola,</p>
          
          <p>
            Tu reclamo ha sido registrado correctamente en nuestro sistema.
            Guarda el siguiente número, ya que te permitirá hacer seguimiento:
          </p>
          
          <div style="
            background-color: #f0f8ff;
            border: 1px dashed #007bff;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            font-size: 20px;
            font-weight: bold;
            color: #007bff;
          ">
            ${numeroReclamo}
          </div>
          
          <p>
            Si necesitas consultar el estado de tu reclamo, utiliza este número
            en nuestra plataforma o comunícate con nuestro equipo de atención.
          </p>
          
          <p style="margin-top: 30px;">
            Atentamente,<br />
            <strong>Equipo Karsil Cargo</strong>
          </p>
        </div>
      </div>
    `,
  });
};

