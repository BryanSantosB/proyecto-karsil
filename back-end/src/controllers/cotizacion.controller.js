const { calcularEnvio } = require("../services/cotizacion.service");

exports.cotizarEnvio = (req, res) => {
  try {
    const resultado = calcularEnvio(req.body);

    if (resultado.error) {
      return res.status(400).json(resultado);
    }

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al calcular cotización" });
  }
};
