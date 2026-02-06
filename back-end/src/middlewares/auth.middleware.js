import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // id, roles, permissions
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
