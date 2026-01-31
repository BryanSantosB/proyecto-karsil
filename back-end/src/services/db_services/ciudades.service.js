const pool = require("../../config/database.js");

/**
 * Obtener todas las ciudades con su departamento
 */
async function obtenerCiudades() {
  const query = `
    SELECT
      c.id,
      c.nombre,
      c.direccion,
      c.latitud,
      c.longitud,
      json_build_object(
        'id', d.id,
        'nombre', d.nombre
      ) AS departamento
    FROM ciudades c
    JOIN departamentos d ON d.id = c.departamento_id
    ORDER BY c.nombre;
  `;

  const { rows } = await pool.query(query);
  return rows;
}

/**
 * Obtener ciudad por ID con su departamento
 */
async function obtenerCiudadPorId(id) {
  const query = `
    SELECT
      c.id,
      c.nombre,
      c.direccion,
      c.latitud,
      c.longitud,
      json_build_object(
        'id', d.id,
        'nombre', d.nombre
      ) AS departamento
    FROM ciudades c
    JOIN departamentos d ON d.id = c.departamento_id
    WHERE c.id = $1;
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

/**
 * Obtener ciudades por departamento
 */
async function obtenerCiudadesPorDepartamento(departamentoId) {
  const query = `
    SELECT
      c.id,
      c.nombre,
      c.direccion,
      c.latitud,
      c.longitud
    FROM ciudades c
    WHERE c.departamento_id = $1
    ORDER BY c.nombre;
  `;

  const { rows } = await pool.query(query, [departamentoId]);
  return rows;
}

module.exports = {
  obtenerCiudades,
  obtenerCiudadPorId,
  obtenerCiudadesPorDepartamento,
};
