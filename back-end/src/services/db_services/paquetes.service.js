import pool from "../../config/database.js";

/**
 * Obtener todos los tipos de paquetes (envío)
 */
export async function getTipoPaquete() {
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