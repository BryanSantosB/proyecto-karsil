const pool = require("../../config/database");

exports.getModalidadEnvio = async () => {
  const query = `
    SELECT
      m.id,
      m.nombre,
      m.value,
      m.icon
    FROM modalidad_envio m;
  `;

  const { rows } = await pool.query(query);
  return rows;
}