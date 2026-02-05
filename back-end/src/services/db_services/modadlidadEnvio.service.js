import pool from "../../config/database.js";

/**
 * Obtener todas las modalidades de envío
 */
export async function getModalidadEnvio() {
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