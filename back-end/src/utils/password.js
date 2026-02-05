// src/utils/password.js
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Encripta una contraseña usando hashing de un solo sentido
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano con un hash almacenado
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}