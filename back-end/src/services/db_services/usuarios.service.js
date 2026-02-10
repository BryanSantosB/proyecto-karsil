import pool from "../../config/database.js";

/**
 * Obtener todos los trabajadores (usuarios) para asignar reclamos
 */
export async function getTrabajadores() {
  const query = `
    SELECT 
        u.id, 
        u.nombre, 
        u.email, 
        u.activo,
        r.nombre AS rol
    FROM usuarios u
    JOIN usuarios_roles ur ON u.id = ur.usuario_id
    JOIN roles r ON ur.rol_id = r.id
    WHERE r.id = 5;
  `;

  const { rows } = await pool.query(query);
  return rows;
}