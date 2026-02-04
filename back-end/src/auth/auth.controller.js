import { findUserByEmail, updateLastLogin } from "./auth.service.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password requeridos" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    await updateLastLogin(user.id);

    const token = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno" });
  }
}
