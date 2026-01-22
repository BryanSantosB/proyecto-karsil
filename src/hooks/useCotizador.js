import { calcularEnvio } from "../utils/calcularEnvio";

export function useCotizador(formData) {
  return calcularEnvio(formData);
}
