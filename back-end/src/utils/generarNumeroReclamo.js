export const generarNumeroReclamo = async (client) => {
  const year = new Date().getFullYear();

  const { rows } = await client.query(
    `SELECT COUNT(*) FROM reclamos WHERE EXTRACT(YEAR FROM fecha_creacion) = $1`,
    [year]
  );

  const correlativo = String(Number(rows[0].count) + 1).padStart(6, "0");

  return `REC-${year}-${correlativo}`;
};
