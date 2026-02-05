import pool from "../config/database.js";
import { listaFechas } from "../data/fechasRecojo.js";

/**
 * Obtener lista estática de fechas de recojo
 */
export const getFechasRecojo = () => {
  return listaFechas;
};

/**
 * Obtener fechas de recojo desde la base de datos
 */
export async function getFechas() {
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