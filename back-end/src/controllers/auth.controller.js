import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  try {
    const { email, password } = req.body;
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const { token, user } = await authService.login(email, password);
    console.log("USER ENCONTRADO:", user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const { token, user } = await authService.registerAndLogin({
      nombre,
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const me = (req, res) => {
  let user = req.user;
  console.log("Usuario autenticado:", user)
  res.json({ user});
};

// controllers/auth.controller.js
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Sesión cerrada correctamente" });
};

