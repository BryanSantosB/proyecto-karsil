import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  User,
  Calendar,
  FileText,
  Paperclip,
  Save,
  Send,
  CheckCircle,
  // eslint-disable-next-line
  Clock,
  MapPin,
} from "lucide-react";
import { api } from "services/api";
import StatusBadge from "features/dashboard/main_components/StatusBadge";
import ProgressBar from "features/dashboard/main_components/ProgressBar";
import Modal from "features/dashboard/main_components/Modal";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";

const GestionReclamo = ({ reclamoId, onClose, onUpdate }) => {
  const [reclamo, setReclamo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [alerta, setAlerta] = useState("");
  const [estadosReclamo, setEstadosReclamo] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  // Estados editables - Gestión interna
  const [gestionInterna, setGestionInterna] = useState({
    estado: "pendiente",
    progreso: 0,
    asignado_a: "",
    observaciones_internas: "",
  });

  // Estados editables - Respuesta al cliente
  const [respuestaCliente, setRespuestaCliente] = useState({
    respuesta_cliente: "",
    enviar_correo: false,
  });

  // Cargar los estados y trabajadores
  useEffect(() => {
    api
      .get("/reclamos/estados")
      .then((res) => {
        setEstadosReclamo(res.data);
      })
      .catch(console.error);

    api
      .get("/users/trabajadores")
      .then((res) => {
        setTrabajadores(res.data.data);
      })
      .catch(console.error);
  }, []);

  // Cargar datos del reclamo
  useEffect(() => {
    const cargarReclamo = async () => {
      if (!reclamoId) {
        setError("ID de reclamo no proporcionado");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/reclamos/${reclamoId}`);

        const data = response.data.data || response.data;

        setReclamo(data);

        // Configurar gestión interna con datos existentes o valores por defecto
        setGestionInterna({
          id: data.id,
          estado: data.estado.codigo,
          progreso: data.estado.progreso,
          asignado_a: data.asignado_a?.id || "",
          observaciones_internas: data.observaciones_internas || "",
        });

        // Configurar respuesta al cliente
        setRespuestaCliente({
          respuesta_cliente: data.respuesta_cliente || "",
          enviar_correo: false,
        });
      } catch (error) {
        console.error("Error al cargar reclamo:", error);
        setError("Error al cargar la información del reclamo");
      } finally {
        setLoading(false);
      }
    };

    cargarReclamo();
  }, [reclamoId]);

  const handleGuardarGestion = async () => {
    try {
      await api.put(`/reclamos/${gestionInterna.id}/gestion`, {
        estado: gestionInterna.estado,
        asignado_a: gestionInterna.asignado_a,
        observaciones_internas: gestionInterna.observaciones_internas,
      });
      setAlerta("Gestión interna guardada correctamente");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error al guardar gestión:", error.message);
      setError("Error al guardar los cambios");
    }
  };

  const handleEnviarRespuesta = async () => {
    if (!respuestaCliente.respuesta_cliente.trim()) {
      setError("Debes escribir una respuesta para el cliente");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmarEnvio = async () => {
    setEnviando(true);
    try {
      console.log("Enviando respuesta:", {
        gestion: gestionInterna,
        respuesta: respuestaCliente,
      });

      await api.post(`/reclamos/${gestionInterna.id}/responder`, {
        ...gestionInterna,
        ...respuestaCliente
      });

      setAlerta("Respuesta enviada correctamente");
      setShowConfirmModal(false);

      if (onUpdate) onUpdate();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      setError("Error al enviar la respuesta");
    } finally {
      setEnviando(false);
    }
  };

  // Lista de trabajadores (reemplazar con datos de tu API)
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del reclamo...</p>
        </div>
      </div>
    );
  }

  if (error || !reclamo) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">
          {error || "No se pudo cargar la información del reclamo"}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Cerrar
        </button>
      </div>
    );
  }

  const yaRespondido = reclamo.respuesta_enviada || false;

  return (
    <div className="space-y-6">

      <AlertaFlotante mensaje={error} onClose={() => setError("")} />
        
      <AlertaFlotante mensaje={alerta} tipo="success" onClose={() => setAlerta("")} />

      {/* 1️⃣ INFORMACIÓN DEL RECLAMO - SOLO LECTURA */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Información del Reclamo
            </h3>
            <p className="text-sm text-gray-600">
              Datos reportados por el cliente
            </p>
          </div>
          <StatusBadge status={gestionInterna.estado} size="md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Número de Reclamo */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Número
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-gray-900">
              #{reclamo.numero_reclamo}
            </p>
          </div>

          {/* Fecha */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Fecha de Creación
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {new Date(reclamo.fecha_creacion).toLocaleString()}
            </p>
          </div>

          {/* Cliente */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Cliente
              </span>
            </div>
            <p className="font-semibold text-gray-900">
              {reclamo.nombre_completo}
            </p>
            <p className="text-sm text-gray-600">{reclamo.email}</p>
            <p className="text-sm text-gray-600">{reclamo.telefono}</p>
            <p className="text-xs text-gray-500 mt-1">
              {reclamo.tipo_documento}: {reclamo.numero_documento}
            </p>
          </div>

          {/* Número de Guía */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Número de Guía
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-gray-900">
              {reclamo.numero_guia}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Servicio: {new Date(reclamo.fecha_servicio).toLocaleDateString()}
            </p>
          </div>

          {/* Tipo de Servicio */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Tipo de Servicio
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {reclamo.tipo_servicio?.nombre}
            </p>
          </div>

          {/* Oficina */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Oficina
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {reclamo.oficina?.nombre}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {reclamo.oficina?.direccion}
            </p>
          </div>

          {/* Motivo */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Motivo del Reclamo
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">
              {reclamo.motivos_reclamo?.nombre}
            </p>
            <p className="text-sm text-gray-700">{reclamo.descripcion}</p>
            {reclamo.monto_reclamado && (
              <p className="text-sm font-semibold text-gray-900 mt-2">
                Monto reclamado: S/ {reclamo.monto_reclamado}
              </p>
            )}
          </div>

          {/* Evidencias */}
          {reclamo.evidencias && reclamo.evidencias.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Evidencias ({reclamo.evidencias.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {reclamo.evidencias.map((evidencia, index) => (
                  <a
                    key={index}
                    href={`${process.env.REACT_APP_API_UR}/${evidencia.ruta_archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    {evidencia.nombre_original}
                    <span className="text-xs text-gray-500">
                      ({(evidencia.tamaño_bytes / 1024).toFixed(1)} KB)
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Firma Digital */}
          {reclamo.firma_digital && (
            <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Firma Digital
                </span>
              </div>
              <p className="text-sm text-gray-700 italic">
                {reclamo.firma_digital}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ✓ Cliente acepta políticas y condiciones
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2️⃣ GESTIÓN INTERNA - EDITABLE */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-primary rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900">Gestión Interna</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Información de uso interno, no visible para el cliente
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estado */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estado del Reclamo
            </label>
            <CustomSelect
              placeholder="Estado del Reclamo"
              value={gestionInterna.estado}
              options={estadosReclamo}
              onChange={(e) =>
                setGestionInterna({ ...gestionInterna, estado: e.target.value })
              }
              val="codigo"
              lab="nombre"
            />
          </div>

          {/* Asignado a */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Asignado a
            </label>
            <CustomSelect
              placeholder="Asignado a"
              value={gestionInterna.asignado_a}
              options={trabajadores}
              onChange={(e) =>
                setGestionInterna({ ...gestionInterna, asignado_a: e.target.value })
              }
              val="id"
              lab="nombre"
            />
          </div>

          {/* Progreso */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Progreso: {gestionInterna.progreso}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={gestionInterna.progreso}
              onChange={(e) =>
                setGestionInterna({
                  ...gestionInterna,
                  progreso: parseInt(e.target.value),
                })
              }
              disabled={yaRespondido}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-primary disabled:cursor-not-allowed"
            />
            <ProgressBar
              value={gestionInterna.progreso}
              showPercentage={false}
            />
          </div>

          {/* Observaciones Internas */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observaciones Internas
            </label>
            <textarea
              value={gestionInterna.observaciones_internas}
              onChange={(e) =>
                setGestionInterna({
                  ...gestionInterna,
                  observaciones_internas: e.target.value,
                })
              }
              disabled={yaRespondido}
              rows={4}
              placeholder="Notas internas sobre el seguimiento del reclamo..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {!yaRespondido && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleGuardarGestion}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Guardar Gestión
            </button>
          </div>
        )}
      </div>

      {/* 3️⃣ RESPUESTA AL CLIENTE */}
      <div className="bg-white rounded-xl border-2 border-primary-primary p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-primary rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900">
            Respuesta al Cliente
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {yaRespondido ? (
            <span className="inline-flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-4 h-4" />
              Respuesta enviada - Solo lectura
            </span>
          ) : (
            "Esta respuesta será enviada al cliente por correo electrónico"
          )}
        </p>

        <div className="space-y-4">
          {/* Textarea de respuesta */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mensaje para el Cliente
            </label>
            <textarea
              value={respuestaCliente.respuesta_cliente}
              onChange={(e) =>
                setRespuestaCliente({
                  ...respuestaCliente,
                  respuesta_cliente: e.target.value,
                })
              }
              disabled={yaRespondido}
              rows={6}
              placeholder="Escribe aquí la respuesta que recibirá el cliente..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Checkbox enviar correo */}
          {!yaRespondido && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <input
                type="checkbox"
                id="enviar_correo"
                checked={respuestaCliente.enviar_correo}
                onChange={(e) =>
                  setRespuestaCliente({
                    ...respuestaCliente,
                    enviar_correo: e.target.checked,
                  })
                }
                className="w-5 h-5 text-primary-primary rounded focus:ring-2 focus:ring-primary-primary cursor-pointer"
              />
              <label
                htmlFor="enviar_correo"
                className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
              >
                Enviar notificación por correo electrónico al cliente
              </label>
            </div>
          )}
        </div>

        {!yaRespondido && (
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleEnviarRespuesta}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
              Enviar Respuesta
            </button>
          </div>
        )}
      </div>

      {/* 4️⃣ MODAL DE CONFIRMACIÓN */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !enviando && setShowConfirmModal(false)}
        title="Confirmar Envío"
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            ¿Estás seguro de enviar esta respuesta?
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Esta acción{" "}
            {respuestaCliente.enviar_correo &&
              "enviará un correo al cliente y "}
            cerrará el reclamo. No podrás editar la respuesta posteriormente.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Vista previa de la respuesta:
            </p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {respuestaCliente.respuesta_cliente}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              disabled={enviando}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarEnvio}
              disabled={enviando}
              className="flex-1 px-4 py-2.5 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirmar Envío
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GestionReclamo;
