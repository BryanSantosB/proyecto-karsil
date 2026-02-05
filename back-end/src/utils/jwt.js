// src/utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no definido");
}

/**
 * Firma un token para un usuario específico
 */
export function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verifica la validez de un token
 */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}