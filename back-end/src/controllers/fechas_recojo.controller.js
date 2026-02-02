const {getFechasRecojo, getFechas} = require("../services/fechas_recojo.service");

exports.listFechasRecojo = (req, res) => {
  res.json(getFechasRecojo());
};

exports.listarFechas = async function (req, res) {
  try {
    const fechas = await getFechas();
    res.json({ ok: true, data: fechas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al obtener fechas recojo" });
  }
}
