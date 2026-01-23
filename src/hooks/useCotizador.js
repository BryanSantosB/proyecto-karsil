import { calcularEnvio } from "utils/calcularEnvio";

export function useCotizador(formData) {
  const resultado = calcularEnvio(formData);

  if (!resultado || resultado.error) {
    return {
      listo: false,
      pesoCobrable: null,
      total: null,
      error: resultado?.error,
    };
  }

  return {
    listo: true,
    ...resultado,
  };
}


