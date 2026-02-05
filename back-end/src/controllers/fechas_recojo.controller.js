import { getFechasRecojo, getFechas } from "../services/fechas_recojo.service.js";

export const listFechasRecojo = (req, res) => {
  res.json(getFechasRecojo());
};

export async function listarFechas(req, res) {
  try {
    const fechas = await getFechas();
    res.json({ ok: true, data: fechas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener fechas recojo" });
  }
}