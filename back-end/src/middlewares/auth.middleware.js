// src/middlewares/auth.middleware.js
import { verifyToken } from "../utils/jwt.js";
import { findUserById } from "../models/user.model.js";

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = verifyToken(token);

    const user = await findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: "Usuario inválido" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export { authMiddleware };