import { tarifarioAereo } from "../data/tarifarioAereo";

export function esRutaDisponible(origen, destino) {
  // Resolver ciudades según tipo
  const ciudadOrigen =
    origen.tipo === "recojo"
      ? origen.provincia
      : origen.ciudad;

  const ciudadDestino =
    destino.tipo === "entrega"
      ? destino.provincia
      : destino.ciudad;

  if (!ciudadOrigen || !ciudadDestino) return false;

  const origenUpper = ciudadOrigen.toUpperCase();
  const destinoUpper = ciudadDestino.toUpperCase();

  const origenEsLima = origenUpper.includes("LIMA");
  const destinoEsLima = destinoUpper.includes("LIMA");

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
