import { tarifarioAereo } from "../data/tarifarioAereo";

export function esRutaDisponible(origen, destino) {
  // Resolver ciudades según tipo
  /* const ciudadOrigen =
    origen.tipo === "recojo"
      ? origen.provincia
      : origen.agencia; */
  const ciudadOrigen = origen.agencia;

  /* const ciudadDestino =
    destino.tipo === "entrega"
      ? destino.provincia
      : destino.agencia; */
  const ciudadDestino = destino.agencia;

  if (!ciudadOrigen || !ciudadDestino) return false;

  const origenUpper = ciudadOrigen.toUpperCase();
  const destinoUpper = ciudadDestino.toUpperCase();

  const origenEsLima = origenUpper.includes("LIMA");
  const destinoEsLima = destinoUpper.includes("LIMA");

  console.log("Validando ruta:", origenUpper, "->", destinoUpper);

  // ❌ Lima → Lima
  if (origenEsLima && destinoEsLima) return false;

  // ❌ Provincia → Provincia
  if (!origenEsLima && !destinoEsLima) return false;

  // Provincia involucrada
  const ciudadRuta = origenEsLima
    ? destinoUpper
    : origenUpper;

  // ✔ Existe en tarifario
  return Boolean(tarifarioAereo[ciudadRuta]);
}
