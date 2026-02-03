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

export const obtenerReclamoPorNumero = async (numeroReclamo) => {
  const reclamoQuery = `
    SELECT
      r.id,
      r.numero_reclamo,
      r.fecha_creacion,

      r.nombre_completo,
      r.tipo_documento,
      r.numero_documento,
      r.email,
      r.telefono,

      r.numero_guia,
      r.fecha_servicio,

      -- Objeto completo de tipo_servicio
      json_build_object(
        'id', ts.id,
        'nombre', ts.nombre,
        'value', ts.value,
        'icon', ts.icon
      ) as tipo_servicio,

      -- Objeto completo de oficina con departamento incluido
      json_build_object(
        'id', c.id,
        'nombre', c.nombre,
        'direccion', c.direccion,
        'latitud', c.latitud,
        'longitud', c.longitud,
        'departamento_id', c.departamento_id,
        'departamento', json_build_object(
          'id', d.id,
          'nombre', d.nombre
        )
      ) as oficina,

      r.motivo_reclamo,
      r.descripcion,
      r.monto_reclamado,

      r.acepta_politicas,
      r.firma_digital
    FROM reclamos r
    LEFT JOIN tipos_envio ts ON r.tipo_servicio_id = ts.id
    LEFT JOIN ciudades c ON r.oficina_id = c.id
    LEFT JOIN departamentos d ON c.departamento_id = d.id
    WHERE r.numero_reclamo = $1
  `;

  const reclamoResult = await pool.query(reclamoQuery, [numeroReclamo]);

  if (reclamoResult.rows.length === 0) return null;

  const evidenciasQuery = `
    SELECT
      id,
      nombre_original,
      ruta_archivo,
      tipo_mime,
      tamaño_bytes,
      fecha_subida
    FROM evidencias_reclamo
    WHERE reclamo_id = $1
  `;

  const evidenciasResult = await pool.query(
    evidenciasQuery,
    [reclamoResult.rows[0].id]
  );

  return {
    ...reclamoResult.rows[0],
    evidencias: evidenciasResult.rows,
  };
};


