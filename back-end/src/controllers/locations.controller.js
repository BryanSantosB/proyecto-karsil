const { getCiudadesOrigen } = require("../services/locations.service");

exports.listCiudadesOrigen = (req, res) => {
  res.json(getCiudadesOrigen());
};
