import pool from "../../config/database.js";

/**
 * Crear cotización
 */
async function crearCotizacion(data) {
  const query = `
    INSERT INTO cotizaciones (
      origen_ciudad_id,
      destino_ciudad_id,
      tipo_origen,
      tipo_destino,
      direccion_origen,
      direccion_destino,
      fecha_recojo,
      peso,
      largo,
      ancho,
      alto,
      tipo_envio_id,
      modalidad_id,
      telefono,
      email,
      total
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
    )
    RETURNING *;
  `;

  const values = [
    data.origen_ciudad_id,
    data.destino_ciudad_id,
    data.tipo_origen,
    data.tipo_destino,
    data.direccion_origen,
    data.direccion_destino,
    data.fecha_recojo,
    data.peso,
    data.largo,
    data.ancho,
    data.alto,
    data.tipo_envio_id,
    data.modalidad_id,
    data.telefono,
    data.email,
    data.total,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

/**
 * Obtener todas las cotizaciones
 */
async function obtenerCotizaciones() {
  const { rows } = await pool.query(
    "SELECT * FROM cotizaciones ORDER BY fecha DESC"
  );
  return rows;
}

/**
 * Obtener cotización por ID
 */
async function obtenerCotizacionPorId(id) {
  const { rows } = await pool.query(
    "SELECT * FROM cotizaciones WHERE id = $1",
    [id]
  );
  return rows[0];
}

/**
 * Actualizar cotización
 */
async function actualizarCotizacion(id, data) {
  const query = `
    UPDATE cotizaciones SET
      origen_ciudad_id = $1,
      destino_ciudad_id = $2,
      tipo_origen = $3,
      tipo_destino = $4,
      direccion_origen = $5,
      direccion_destino = $6,
      fecha_recojo = $7,
      peso = $8,
      largo = $9,
      ancho = $10,
      alto = $11,
      tipo_envio_id = $12,
      modalidad_id = $13,
      telefono = $14,
      email = $15,
      total = $16
    WHERE id = $17
    RETURNING *;
  `;

  const values = [
    data.origen_ciudad_id,
    data.destino_ciudad_id,
    data.tipo_origen,
    data.tipo_destino,
    data.direccion_origen,
    data.direccion_destino,
    data.fecha_recojo,
    data.peso,
    data.largo,
    data.ancho,
    data.alto,
    data.tipo_envio_id,
    data.modalidad_id,
    data.telefono,
    data.email,
    data.total,
    id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

/**
 * Eliminar cotización
 */
async function eliminarCotizacion(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM cotizaciones WHERE id = $1",
    [id]
  );
  return rowCount > 0;
}

export {
  crearCotizacion,
  obtenerCotizaciones,
  obtenerCotizacionPorId,
  actualizarCotizacion,
  eliminarCotizacion,
};