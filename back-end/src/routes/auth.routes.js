// src/routes/auth.routes.js
import express from "express";
const router = express.Router();
import { login } from "../services/auth.service.js";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

export default router;