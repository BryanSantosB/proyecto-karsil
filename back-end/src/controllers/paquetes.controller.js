const { getTipoPaquete } = require("../services/db_services/paquetes.service");

exports.listarTiposPaquete = async function (req, res) {
  try {
    const tiposPaquete = await getTipoPaquete();
    res.json({ ok: true, data: tiposPaquete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener tipos de paquetes" });
  }
}