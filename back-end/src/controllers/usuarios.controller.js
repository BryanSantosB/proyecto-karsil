import { getTrabajadores } from "../services/db_services/usuarios.service.js";

export async function listarTrabajadores(req, res) {
  try {
    const trabajadores = await getTrabajadores();
    res.json({ ok: true, data: trabajadores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener trabajadores" });
  }
}