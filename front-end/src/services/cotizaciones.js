import { api } from "./api";

export const cotizarEnvio = async (formData) => {
  const { data } = await api.post("/cotizaciones", formData);
  return data;
};

export const crearCotizacion = async (formData) => {
  const { data } = await api.post("/cotizaciones/crear", formData);
  return data;
};

