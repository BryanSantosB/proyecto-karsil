
export function esRutaDisponible(origen, destino, tarifario) {
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

  // ❌ Lima → Lima
  if (origenEsLima && destinoEsLima) return false;

  // ❌ Provincia → Provincia
  if (!origenEsLima && !destinoEsLima) return false;

  // Provincia involucrada
  const ciudadRuta = origenEsLima
    ? destinoUpper
    : origenUpper;

  // ✔ Existe en tarifario
  return Boolean(existeAgencia(ciudadRuta, tarifario));
}

export function existeAgencia(agencia, lista) {
  if (!agencia || !Array.isArray(lista)) return false;

  const agenciaUpper = agencia.trim().toUpperCase();

  return lista.some(item =>
    item.label?.trim().toUpperCase() === agenciaUpper
  );
}
