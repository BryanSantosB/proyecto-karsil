// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { login } = require("../services/auth.service");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

module.exports = router;
