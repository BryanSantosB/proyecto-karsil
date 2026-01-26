const {getFechasRecojo} = require("../services/fechas_recojo.service");

exports.listFechasRecojo = (req, res) => {
  res.json(getFechasRecojo());
};
