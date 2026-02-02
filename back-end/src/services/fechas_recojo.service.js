const pool = require("../config/database");
const { listaFechas } = require("../data/fechasRecojo");

exports.getFechasRecojo = () => {
  return listaFechas;
};

exports.getFechas = async () => {
  const query = `
    SELECT
      f.id,
      f.fecha,
      f.activo
    FROM fechas_recojo f;
  `;

  const { rows } = await pool.query(query);
  return rows;
}
