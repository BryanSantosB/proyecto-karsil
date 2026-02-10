import pool from "../../config/database.js";
import { generarNumeroReclamo } from "../../utils/generarNumeroReclamo.js";
import { enviarCorreoRespuestaReclamo } from "../email.service.js";

export const crearReclamoService = async (data, archivos, userId = null) => {
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
      motivoReclamoId,
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
    firma_digital,
    usuario_asignado_id
  ) VALUES (
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
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
        motivoReclamoId,
        descripcionDetallada,
        montoReclamado || null,
        aceptaPoliticas,
        firmaDigital,
        userId,
      ],
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
        ],
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

      json_build_object(
        'id', e.id,
        'codigo', e.codigo,
        'nombre', e.nombre,
        'progreso', e.progreso
      ) AS estado,

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

      json_build_object(
        'id', u.id,
        'nombre', u.nombre,
        'email', u.email
      ) as asignado_a,

      -- Objeto completo de tipo_servicio
      json_build_object(
        'id', mr.id,
        'codigo', mr.codigo,
        'nombre', mr.nombre
      ) as motivos_reclamo,

      r.descripcion,
      r.monto_reclamado,

      r.acepta_politicas,
      r.firma_digital,
      r.observaciones_internas,
      r.respuesta_cliente
    FROM reclamos r
    LEFT JOIN tipos_envio ts ON r.tipo_servicio_id = ts.id
    LEFT JOIN ciudades c ON r.oficina_id = c.id
    LEFT JOIN estados_reclamo e ON e.id = r.estado_id
    LEFT JOIN departamentos d ON c.departamento_id = d.id
    LEFT JOIN motivos_reclamo mr ON r.motivo_reclamo = mr.id
    LEFT JOIN usuarios u ON r.asignado_a = u.id
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

  const evidenciasResult = await pool.query(evidenciasQuery, [
    reclamoResult.rows[0].id,
  ]);

  return {
    ...reclamoResult.rows[0],
    evidencias: evidenciasResult.rows,
  };
};

export const getAllReclamos = async () => {
  const query = `
    SELECT
      r.numero_reclamo,
      r.fecha_creacion,
      r.nombre_completo,
      r.numero_guia,

      json_build_object(
        'id', mr.id,
        'codigo', mr.codigo,
        'nombre', mr.nombre
      ) AS motivo_reclamo,

      json_build_object(
        'id', te.id,
        'nombre', te.nombre
      ) AS tipo_servicio,

      json_build_object(
        'id', c.id,
        'nombre', c.nombre
      ) AS oficina,

      json_build_object(
        'codigo', e.codigo,
        'nombre', e.nombre
      ) AS estado,

      json_build_object(
        'codigo', p.codigo,
        'nombre', p.nombre
      ) AS prioridad,

      json_build_object(
        'id', u.id,
        'nombre', u.nombre
      ) AS asignado

    FROM reclamos r
    LEFT JOIN motivos_reclamo mr ON mr.id = r.motivo_reclamo
    LEFT JOIN tipos_envio te ON te.id = r.tipo_servicio_id
    LEFT JOIN ciudades c ON c.id = r.oficina_id
    LEFT JOIN estados_reclamo e ON e.id = r.estado_id
    LEFT JOIN prioridades_reclamo p ON p.id = r.prioridad_id
    LEFT JOIN usuarios u ON u.id = r.asignado_a
    ORDER BY r.fecha_creacion DESC
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export const getAllEstadosReclamo = async () => {
  const query = `
    SELECT
      id,
      codigo,
      nombre
    FROM estados_reclamo
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export const getAllMotivosReclamo = async () => {
  const query = `
    SELECT
      id,
      codigo,
      nombre
    FROM motivos_reclamo
  `;

  const { rows } = await pool.query(query);
  return rows;
};

/**
 * Actualiza la gestión interna de un reclamo
 */
export const updateGestionReclamo = async (
  reclamoId,
  { estado, asignado_a, observaciones_internas }
) => {
  // Obtener ID del estado desde el código
  const estadoResult = await pool.query(
    `SELECT id FROM estados_reclamo WHERE codigo = $1`,
    [estado]
  );

  if (estadoResult.rowCount === 0) {
    throw new Error("Estado de reclamo no válido");
  }

  const estadoId = estadoResult.rows[0].id;

  // Actualizar reclamo
  const result = await pool.query(
    `
    UPDATE reclamos
    SET
      estado_id = $1,
      asignado_a = $2,
      observaciones_internas = $3,
      fecha_actualizacion = NOW()
    WHERE id = $4
    RETURNING id
    `,
    [
      estadoId,
      asignado_a || null,
      observaciones_internas || null,
      reclamoId,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Reclamo no encontrado");
  }

  return result.rows[0];
};

export const responderReclamoService = async ({
  reclamoId,
  respuesta_cliente,
  enviar_correo,
  observaciones_internas,
  asignado_a,
  usuarioId,
}) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Obtener reclamo
    const reclamoRes = await client.query(
      `
      SELECT r.id, r.numero_reclamo, r.respuesta_cliente, r.email
      FROM reclamos r
      WHERE r.id = $1
      FOR UPDATE
      `,
      [reclamoId]
    );

    if (reclamoRes.rowCount === 0) {
      throw new Error('Reclamo no encontrado');
    }

    const reclamo = reclamoRes.rows[0];

    if (reclamo.respuesta_cliente) {
      throw new Error('Este reclamo ya fue respondido');
    }

    // Obtener estado RESOLVED
    const estadoRes = await client.query(
      `SELECT id FROM estados_reclamo WHERE codigo = 'resolved'`
    );

    if (estadoRes.rowCount === 0) {
      throw new Error('Estado resolved no configurado');
    }

    const estadoResolvedId = estadoRes.rows[0].id;

    // Actualizar reclamo (CIERRE AUTOMÁTICO)
    await client.query(
      `
      UPDATE reclamos
      SET
        estado_id = $1,
        respuesta_cliente = $2,
        fecha_respuesta = NOW(),
        fecha_actualizacion = NOW(),
        observaciones_internas = $3,
        asignado_a = $4,
        respondido_por = $5
      WHERE id = $6
      `,
      [
        estadoResolvedId,
        respuesta_cliente,
        observaciones_internas || null,
        asignado_a || null,
        usuarioId,
        reclamoId,
      ]
    );

    // Enviar correo (si aplica)
    if (enviar_correo) {
      await enviarCorreoRespuestaReclamo(
        reclamo.email,
        reclamo.numero_reclamo,
        respuesta_cliente
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

