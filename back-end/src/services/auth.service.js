// src/services/auth.service.js
const { findUserByEmail } = require("../models/user.model");
const { comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

async function login(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    throw new Error("Credenciales inválidas");
  }

  const token = signToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    },
  };
}

module.exports = { login };
