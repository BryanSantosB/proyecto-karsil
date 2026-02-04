// src/models/user.model.js
const pool = require("../config/database");

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `
    SELECT u.*, r.nombre AS rol
    FROM usuarios u
    JOIN roles r ON r.id = u.rol_id
    WHERE u.email = $1 AND u.activo = true
    `,
    [email]
  );
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query(
    `
    SELECT u.id, u.email, u.nombre, r.nombre AS rol
    FROM usuarios u
    JOIN roles r ON r.id = u.rol_id
    WHERE u.id = $1 AND u.activo = true
    `,
    [id]
  );
  return rows[0];
}

module.exports = {
  findUserByEmail,
  findUserById,
};
