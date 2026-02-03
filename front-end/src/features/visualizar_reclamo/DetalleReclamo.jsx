import { motion } from "framer-motion";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";

const DetalleReclamo = ({ reclamo, onCerrar }) => {

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
      en_proceso: "bg-blue-100 text-blue-800 border-blue-300",
      resuelto: "bg-green-100 text-green-800 border-green-300",
      rechazado: "bg-red-100 text-red-800 border-red-300",
    };
    return colores[estado] || "bg-yellow-100 text-yellow-800 border-yellow-300";
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      pendiente: "Pendiente de Revisión",
      en_proceso: "En Proceso",
      resuelto: "Resuelto",
      rechazado: "Rechazado",
    };
    return textos[estado] || "Pendiente de Revisión";
  };

  const getMotivoTexto = (motivo) => {
    const motivos = {
      demora_entrega: "Demora en la Entrega",
      paquete_dañado: "Paquete Dañado",
      paquete_perdido: "Paquete Perdido",
      mal_servicio: "Mal Servicio al Cliente",
      cobro_incorrecto: "Cobro Incorrecto",
      otro: "Otro Motivo",
    };
    return motivos[motivo] || motivo;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "No especificada";
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearFechaCorta = (fecha) => {
    if (!fecha) return "No especificada";
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatearTamaño = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    }
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const obtenerUrlArchivo = (rutaArchivo) => {
    // Ajusta esta URL base según tu configuración del backend
    const baseUrl = process.env.REACT_APP_API_UR;
    return `${baseUrl}/${rutaArchivo.replace(/\\/g, "/")}`;
  };

  // Estado por defecto si no viene en la respuesta
  const estado = reclamo.estado || "pendiente";
  const progreso = reclamo.progreso || 25; // 25% por defecto para pendiente

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header con estado */}
      <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Reclamo #{reclamo.numero_reclamo}
            </h2>
            <p className="text-sm text-gray-500">
              Registrado el {formatearFecha(reclamo.fecha_creacion)}
            </p>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold ${getEstadoColor(estado)}`}>
            <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
            {getEstadoTexto(estado)}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-xs font-semibold text-gray-600">
              Progreso del Reclamo
            </div>
            <div className="text-xs font-semibold text-gray-600">
              {progreso}%
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
            <div
              style={{ width: `${progreso}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-primary transition-all duration-500"
            ></div>
          </div>
        </div>
      </NeumorphicContainer>

      {/* Información del Cliente */}
      <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👤</div>
            <h3 className="text-lg font-bold text-gray-800 uppercase">
              Datos del Cliente
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem 
            label="Nombre Completo" 
            value={reclamo.nombre_completo} 
          />
          <InfoItem 
            label={reclamo.tipo_documento} 
            value={reclamo.numero_documento} 
          />
          <InfoItem 
            label="Correo Electrónico" 
            value={reclamo.email} 
          />
          <InfoItem 
            label="Teléfono" 
            value={reclamo.telefono} 
          />
        </div>
      </NeumorphicContainer>

      {/* Información del Servicio */}
      <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📦</div>
            <h3 className="text-lg font-bold text-gray-800 uppercase">
              Información del Servicio
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem 
            label="Número de Guía" 
            value={reclamo.numero_guia} 
          />
          <InfoItem 
            label="Fecha del Servicio" 
            value={formatearFechaCorta(reclamo.fecha_servicio)} 
          />
          <InfoItem 
            label="Tipo de Servicio" 
            value={`ID: ${reclamo.tipo_servicio.nombre}`} 
          />
          <InfoItem 
            label="Oficina" 
            value={`ID: ${reclamo.oficina.nombre}`} 
          />
        </div>
      </NeumorphicContainer>

      {/* Detalle del Reclamo */}
      <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border-l-4 border-orange-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800 uppercase">
              Detalle del Reclamo
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <InfoItem 
            label="Motivo del Reclamo" 
            value={getMotivoTexto(reclamo.motivo_reclamo)} 
          />
          
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Descripción Detallada
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap">
                {reclamo.descripcion || "Sin descripción"}
              </p>
            </div>
          </div>

          {reclamo.monto_reclamado && (
            <InfoItem 
              label="Monto Reclamado" 
              value={`S/. ${parseFloat(reclamo.monto_reclamado).toFixed(2)}`} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              label="Acepta Políticas" 
              value={reclamo.acepta_politicas ? "✅ Sí" : "❌ No"} 
            />
            <InfoItem 
              label="Firma Digital" 
              value={reclamo.firma_digital} 
            />
          </div>
        </div>
      </NeumorphicContainer>

      {/* Evidencias */}
      {reclamo.evidencias && reclamo.evidencias.length > 0 && (
        <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📎</div>
              <h3 className="text-lg font-bold text-gray-800 uppercase">
                Archivos Adjuntos ({reclamo.evidencias.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reclamo.evidencias.map((archivo) => (
              <div
                key={archivo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-primary transition-colors group"
              >
                <div className="text-2xl">
                  {archivo.tipo_mime?.startsWith("image/") ? "🖼️" : "📄"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {archivo.nombre_original}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatearTamaño(archivo.tamaño_bytes)}</span>
                    <span>•</span>
                    <span>{formatearFechaCorta(archivo.fecha_subida)}</span>
                  </div>
                </div>
                <a
                  href={obtenerUrlArchivo(archivo.ruta_archivo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-primary hover:text-primary-primary/80 text-sm font-semibold group-hover:underline"
                >
                  Ver
                </a>
              </div>
            ))}
          </div>
        </NeumorphicContainer>
      )}

      {/* Respuesta (si existe) */}
      {reclamo.respuesta && (
        <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 border-l-4 border-indigo-500 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💬</div>
              <h3 className="text-lg font-bold text-gray-800 uppercase">
                Respuesta de Karsil Cargo
              </h3>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">
              {reclamo.respuesta}
            </p>
            {reclamo.fecha_respuesta && (
              <p className="text-xs text-gray-500 mt-3">
                Respondido el {formatearFecha(reclamo.fecha_respuesta)}
              </p>
            )}
          </div>
        </NeumorphicContainer>
      )}

      {/* Botón volver */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onCerrar}
          className="py-3 px-8 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200 shadow-md"
        >
          ← Volver a la búsqueda
        </button>
      </div>
    </motion.div>
  );
};

// Componente auxiliar para mostrar información
const InfoItem = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">
      {label}
    </label>
    <p className="text-gray-800 font-medium bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
      {value || "No especificado"}
    </p>
  </div>
);

export default DetalleReclamo;