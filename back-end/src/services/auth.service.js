import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

export const login = async (email, password) => {
  const { rows } = await pool.query(
    `
    SELECT
      u.id,
      u.nombre,
      u.email,
      u.password_hash,
      ARRAY_AGG(DISTINCT r.nombre)     AS roles,
      ARRAY_AGG(DISTINCT p.codigo)     AS permissions
    FROM usuarios u
    JOIN usuarios_roles ur ON ur.usuario_id = u.id
    JOIN roles r ON r.id = ur.rol_id
    LEFT JOIN roles_permisos rp ON rp.rol_id = r.id
    LEFT JOIN permisos p ON p.id = rp.permiso_id
    WHERE u.email = $1
      AND u.activo = true
    GROUP BY u.id;
  `,
    [email],
  );

  console.log('Objeto recibido de query:', rows);
  const user = rows[0];
  console.log('HASH BD:', user.password_hash);
  console.log('COMPARE:', await bcrypt.compare(password, user.password_hash));


  
  if (!user) throw new Error("Credenciales inválidas");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Credenciales inválidas");

  const token = jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    },
  };
};

export const registerAndLogin = async ({ nombre, email, password }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Verificar email
    const exists = await client.query(
      "SELECT 1 FROM usuarios WHERE email = $1",
      [email],
    );

    if (exists.rowCount) throw new Error("El email ya está registrado");

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const { rows } = await client.query(
      `
      INSERT INTO usuarios (nombre, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [nombre, email, passwordHash],
    );

    const userId = rows[0].id;

    // Asignar rol por defecto (cliente)
    await client.query(
      `
      INSERT INTO usuarios_roles (usuario_id, rol_id)
      SELECT $1, id FROM roles WHERE nombre = 'cliente'
      `,
      [userId],
    );

    // Obtener roles
    const rolesResult = await client.query(
      `
      SELECT r.nombre
      FROM roles r
      JOIN usuarios_roles ur ON ur.rol_id = r.id
      WHERE ur.usuario_id = $1
      `,
      [userId],
    );

    const roles = rolesResult.rows.map((r) => r.nombre);

    // Obtener permisos (puede devolver vacío)
    const permissionsResult = await client.query(
      `
      SELECT DISTINCT p.codigo
      FROM permisos p
      JOIN roles_permisos rp ON rp.permiso_id = p.id
      JOIN usuarios_roles ur ON ur.rol_id = rp.rol_id
      WHERE ur.usuario_id = $1
      `,
      [userId],
    );

    const permissions = permissionsResult.rows.map((p) => p.codigo);

    // 7️⃣ Firmar JWT
    const token = jwt.sign(
      {
        id: userId,
        roles,
        permissions,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    await client.query("COMMIT");

    return {
      token,
      user: {
        id: userId,
        nombre,
        email,
        roles,
        permissions,
      },
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
