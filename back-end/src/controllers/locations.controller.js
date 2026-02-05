import { getCiudadesOrigen } from "../services/locations.service.js";

export const listCiudadesOrigen = (req, res) => {
  res.json(getCiudadesOrigen());
};