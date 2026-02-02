const { getModalidadEnvio } = require("../services/db_services/modadlidadEnvio.service");

exports.listarModalidadEnvio = async function (req, res) {
  try {
    const modalidades = await getModalidadEnvio();
    res.json({ ok: true, data: modalidades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener modalidad de envio" });
  }
}