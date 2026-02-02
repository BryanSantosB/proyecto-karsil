import pool from "../../config/database.js";
import { generarNumeroReclamo } from "../../utils/generarNumeroReclamo.js";


export const crearReclamoService = async (data, archivos) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const numeroReclamo = await generarNumeroReclamo(client);

    const {
      nombreCompleto,
      tipoDocumento,
      numeroDocumento,
      email,
      telefono,
      numeroGuia,
      fechaServicio,
      tipoServicioId,
      oficinaId,
      motivoReclamo,
      descripcionDetallada,
      montoReclamado,
      aceptaPoliticas,
      firmaDigital,
    } = data;

    const reclamoResult = await client.query(
      `
      INSERT INTO reclamos (
        numero_reclamo,
        nombre_completo,
        tipo_documento,
        numero_documento,
        email,
        telefono,
        numero_guia,
        fecha_servicio,
        tipo_servicio_id,
        oficina_id,
        motivo_reclamo,
        descripcion,
        monto_reclamado,
        acepta_politicas,
        firma_digital
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      RETURNING id
      `,
      [
        numeroReclamo,
        nombreCompleto,
        tipoDocumento,
        numeroDocumento,
        email,
        telefono,
        numeroGuia,
        fechaServicio || null,
        tipoServicioId,
        oficinaId,
        motivoReclamo,
        descripcionDetallada,
        montoReclamado || null,
        aceptaPoliticas,
        firmaDigital,
      ]
    );

    const reclamoId = reclamoResult.rows[0].id;

    for (const archivo of archivos) {
      await client.query(
        `
        INSERT INTO evidencias_reclamo (
          reclamo_id,
          nombre_original,
          ruta_archivo,
          tipo_mime,
          tamaño_bytes
        ) VALUES ($1,$2,$3,$4,$5)
        `,
        [
          reclamoId,
          archivo.originalname,
          archivo.path,
          archivo.mimetype,
          archivo.size,
        ]
      );
    }

    await client.query("COMMIT");

    return { reclamoId, numeroReclamo };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
