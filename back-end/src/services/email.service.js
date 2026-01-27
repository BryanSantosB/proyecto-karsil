import nodemailer from "nodemailer";

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
  const { pesoCobrable, costoFlete, costoReparto, total } = resultado;

  const html = `
    <h2>📦 Cotización de Envío – Karsil</h2>

    <p><strong>Cliente:</strong> NOMBRE CLIENTE </p>
    <p><strong>Email:</strong> ${cliente.email}</p>

    <hr />

    <h3>Ruta</h3>
    <p>${origen.agencia} → ${destino.agencia}</p>

    <h3>Paquete</h3>
    <ul>
      <li>Tipo de envío: ${paquete.tipoEnvio}</li>
      <li>Categoría: ${paquete.categoria}</li>
      <li>Peso real: ${paquete.peso} kg</li>
      <li>Dimensiones: ${paquete.largo} × ${paquete.ancho} × ${paquete.alto} cm</li>
      <li><strong>Peso cobrable:</strong> ${pesoCobrable} kg</li>
    </ul>

    <h3>Costos</h3>
    <ul>
      <li>Flete: S/ ${costoFlete}</li>
      <li>Recojo / Entrega: S/ ${costoReparto}</li>
    </ul>

    <h2>Total estimado: S/ ${total}</h2>

    <p style="font-size:12px;color:#666">
      * Precio referencial sujeto a validación.
    </p>
  `;

  await transporter.sendMail({
    from: `"Karsil Envíos" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,

    to: cliente.email, // cliente
    cc: process.env.EMAIL_ASESORIA, // asesoría interna
    subject: "Cotización de tu envío - Karsil",
    html,
  });
}
