/**
 * Busca un objeto en una lista cuyo label coincida con el valor agencia
 * @param {Array<Object>} lista
 * @param {string} agencia
 * @returns {Object|null}
 */
export function buscarPorAgencia(lista, agencia) {
  if (!Array.isArray(lista) || !agencia) return null;

  return (
    lista.find(
      (item) =>
        typeof item.label === "string" &&
        item.label.toLowerCase() === agencia.toLowerCase(),
    ) || null
  );
}
