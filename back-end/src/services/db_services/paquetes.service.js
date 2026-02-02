const pool = require("../../config/database");

exports.getTipoPaquete = async () => {
  const query = `
    SELECT
      t.id,
      t.nombre,
      t.value,
      t.icon
    FROM tipos_envio t;
  `;

  const { rows } = await pool.query(query);
  return rows;
}