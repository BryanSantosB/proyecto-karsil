export default function generarEmailCotizacion({
  cliente,
  origen,
  destino,
  paquete,
  resultado,
}) {
  const { pesoCobrable, costoFlete, costoReparto, total } = resultado;

  const html = `
  <h2>📦 Cotización de Envío – Karsil</h2>

  <h3>Datos del Cliente</h3>
  ${cliente?.email ? `<p><strong>Email:</strong> ${cliente.email}</p>` : ""}
  ${cliente?.telefono ? `<p><strong>Teléfono:</strong> ${cliente.telefono}</p>` : ""}

  <hr />

  <h3>Ruta</h3>
  <p><strong>Origen:</strong> ${origen.agencia}</p>
  <p><strong>Destino:</strong> ${destino.agencia}</p>

  <p>
    <strong>Tipo de servicio:</strong>
    ${origen.tipo === "recojo" ? "Recojo a domicilio" : "Entrega en agencia"}
    →
    ${destino.tipo === "entrega" ? "Entrega a domicilio" : "Recojo en agencia"}
  </p>

  ${
    origen.tipo === "recojo" && origen.fecha
      ? `<p><strong>Fecha de recojo:</strong> ${origen.fecha}</p>`
      : ""
  }

  ${
    origen.direccion || destino.direccion
      ? `
        <hr />
        <h3>Dirección</h3>

        ${
          origen.direccion
            ? `
              <p><strong>Dirección de recojo:</strong> ${origen.direccion}</p>
              ${origen.departamento ? `<p>Departamento: ${origen.departamento}</p>` : ""}
              ${origen.provincia ? `<p>Provincia: ${origen.provincia}</p>` : ""}
              ${origen.distrito ? `<p>Distrito: ${origen.distrito}</p>` : ""}
            `
            : ""
        }

        ${
          destino.direccion
            ? `
              <p><strong>Dirección de entrega:</strong> ${destino.direccion}</p>
              ${destino.departamento ? `<p>Departamento: ${destino.departamento}</p>` : ""}
              ${destino.provincia ? `<p>Provincia: ${destino.provincia}</p>` : ""}
              ${destino.distrito ? `<p>Distrito: ${destino.distrito}</p>` : ""}
            `
            : ""
        }
      `
      : ""
  }

  <hr />

  <h3>Paquete</h3>
  <ul>
    ${paquete.tipoEnvio ? `<li><strong>Tipo de envío:</strong> ${paquete.tipoEnvio}</li>` : ""}
    ${paquete.categoria ? `<li><strong>Categoría:</strong> ${paquete.categoria}</li>` : ""}
    ${paquete.peso ? `<li>Peso real: ${paquete.peso} kg</li>` : ""}
    ${
      paquete.largo && paquete.ancho && paquete.alto
        ? `<li>Dimensiones: ${paquete.largo} × ${paquete.ancho} × ${paquete.alto} cm</li>`
        : ""
    }
    ${pesoCobrable ? `<li><strong>Peso cobrable:</strong> ${pesoCobrable} kg</li>` : ""}
  </ul>

  <h3>Costos</h3>
  <ul>
    ${costoFlete !== undefined ? `<li>Flete: S/ ${costoFlete}</li>` : ""}
    ${costoReparto !== undefined ? `<li>Recojo / Entrega: S/ ${costoReparto}</li>` : ""}
  </ul>

  <h2>Total estimado: S/ ${total}</h2>

  <p style="font-size:12px;color:#666">
    * Precio referencial sujeto a validación por un asesor de Karsil.
  </p>
`;
  return html;
}
