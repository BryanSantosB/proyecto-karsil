import { getModalidadEnvio } from "../services/db_services/modadlidadEnvio.service.js";

export async function listarModalidadEnvio(req, res) {
  try {
    const modalidades = await getModalidadEnvio();
    res.json({ ok: true, data: modalidades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener modalidad de envio" });
  }
}