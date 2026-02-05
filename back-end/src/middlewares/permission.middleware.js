import { pool } from '../config/database.js';

export const requirePermission = (permissionCode) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const { rowCount } = await pool.query(`
      SELECT 1
      FROM usuarios_roles ur
      JOIN roles_permisos rp ON rp.rol_id = ur.rol_id
      JOIN permisos p ON p.id = rp.permiso_id
      WHERE ur.usuario_id = $1 AND p.codigo = $2
    `, [userId, permissionCode]);

    if (!rowCount)
      return res.status(403).json({ message: 'Permiso denegado' });

    next();
  };
};
