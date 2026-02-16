import * as authService from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login(email, password);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    user,
  });
});

export const register = catchAsync(async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    throw new AppError("Datos incompletos", 400);
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
});

export const me = (req, res) => {
  let user = req.user;
  res.json({ user });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Sesión cerrada correctamente" });
};
