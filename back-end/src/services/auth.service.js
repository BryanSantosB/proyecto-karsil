import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';

export const login = async (email, password) => {
  const { rows } = await pool.query(`
    SELECT u.*, ARRAY_AGG(r.nombre) AS roles
    FROM usuarios u
    JOIN usuarios_roles ur ON ur.usuario_id = u.id
    JOIN roles r ON r.id = ur.rol_id
    WHERE u.email = $1 AND u.activo = true
    GROUP BY u.id
  `, [email]);

  const user = rows[0];
  if (!user) throw new Error('Credenciales inválidas');

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    {
      id: user.id,
      roles: user.roles
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token };
};

export const registerAndLogin = async ({ nombre, email, password }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Verificar email
    const exists = await client.query(
      'SELECT 1 FROM usuarios WHERE email = $1',
      [email]
    );

    if (exists.rowCount)
      throw new Error('El email ya está registrado');

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const { rows } = await client.query(
      `INSERT INTO usuarios (nombre, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [nombre, email, passwordHash]
    );

    const userId = rows[0].id;

    // Asignar rol por defecto (cliente)
    await client.query(
      `INSERT INTO usuarios_roles (usuario_id, rol_id)
       SELECT $1, id FROM roles WHERE nombre = 'cliente'`,
      [userId]
    );

    // Obtener roles
    const rolesResult = await client.query(
      `SELECT r.nombre
       FROM roles r
       JOIN usuarios_roles ur ON ur.rol_id = r.id
       WHERE ur.usuario_id = $1`,
      [userId]
    );

    const roles = rolesResult.rows.map(r => r.nombre);

    // Generar token
    const token = jwt.sign(
      { id: userId, roles },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await client.query('COMMIT');

    return {
      token,
      user: {
        id: userId,
        nombre,
        email,
        roles
      }
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

