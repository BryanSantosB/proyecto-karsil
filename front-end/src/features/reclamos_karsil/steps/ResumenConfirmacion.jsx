import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import { api } from "services/api";
import ModalConfirmacion from "components/ui/ModalConfirmacion/ModalConfirmacion";
import LoadingOverlay from "components/ui/LoadingOverlay/LoadingOverlay";
import { User, Package, FileText, Paperclip } from "lucide-react";
import FormCard from "../main_components/FormCard";
import StepHeader from "../main_components/StepHeader";
import StepNavigation from "../main_components/StepNavigation";

// Bloque de resumen individual
const ResumenBloque = ({ icon: Icon, title, color, children }) => {
  const colores = {
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'text-blue-500',   title: 'text-blue-800' },
    green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'text-green-500',  title: 'text-green-800' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-500', title: 'text-yellow-800' },
    red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'text-red-500',    title: 'text-red-800' },
  };
  const c = colores[color] || colores.blue;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${c.icon}`} />
        <h4 className={`text-sm font-bold uppercase tracking-wide ${c.title}`}>{title}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {children}
      </div>
    </div>
  );
};

// Campo individual del resumen
const ResumenCampo = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? 'sm:col-span-2' : ''}>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800 break-words">{value || '—'}</p>
  </div>
);

const ResumenConfirmacion = () => {
  const { datosReclamo, archivosEvidencia, anteriorPaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [submensaje, setSubmensaje] = useState("");

  const motivosMap = {
    demora_entrega:      "Demora en la entrega",
    producto_danado:     "Producto dañado",
    producto_perdido:    "Producto perdido o extraviado",
    maltrato_personal:   "Maltrato o mala atención del personal",
    error_facturacion:   "Error en facturación o cobro",
    servicio_incompleto: "Servicio incompleto",
    falta_informacion:   "Falta de información",
    otro:                "Otro motivo",
  };

  const enviarReclamo = async () => {
    setIsLocked(true);
    try {
      const formData = new FormData();
      Object.entries(datosReclamo).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      archivosEvidencia.forEach((archivo) => {
        formData.append("evidencias", archivo);
      });

      const response = await api.post("/reclamos", formData);
      const correo = datosReclamo.email;
      const numeroReclamo = response.data.numeroReclamo;

      await api.post("/correo/numeroReclamo", { correo, numeroReclamo });

      setSubmensaje(response.data.numeroReclamo);
      setMostrarExito(true);
    } catch (error) {
      console.error("Error al enviar reclamo:", error);
      setError(error.response?.data?.message || "Ocurrió un error al registrar tu reclamo. Inténtalo nuevamente.");
    } finally {
      setIsLocked(false);
    }
  };

  const cerrarYReiniciar = () => {
    setMostrarExito(false);
    window.location.href = "/";
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} tipo="error" />

      <FormCard className="max-w-3xl">
        <StepHeader
          icon="✓"
          title="Resumen del Reclamo"
          description="Verifica que todos los datos sean correctos antes de enviar"
        />

        <div className="space-y-4">
          {/* Alerta de verificación */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-lg flex-shrink-0">⚠️</span>
            <div className="text-sm">
              <p className="font-semibold text-amber-800">Revisa tu información antes de enviar</p>
              <p className="text-xs text-amber-700 mt-0.5">Una vez enviado, no podrás modificar el reclamo.</p>
            </div>
          </div>

          {/* Datos del Cliente */}
          <ResumenBloque icon={User} title="Datos del Cliente" color="blue">
            <ResumenCampo label="Nombre completo" value={datosReclamo.nombreCompleto} />
            <ResumenCampo label={datosReclamo.tipoDocumento} value={datosReclamo.numeroDocumento} />
            <ResumenCampo label="Correo electrónico" value={datosReclamo.email} />
            <ResumenCampo label="Teléfono" value={datosReclamo.telefono} />
          </ResumenBloque>

          {/* Información del Servicio */}
          <ResumenBloque icon={Package} title="Información del Servicio" color="green">
            <ResumenCampo label="N° de Guía" value={datosReclamo.numeroGuia} />
            <ResumenCampo
              label="Fecha del Servicio"
              value={datosReclamo.fechaServicio
                ? new Date(datosReclamo.fechaServicio).toLocaleDateString("es-PE")
                : null}
            />
            <ResumenCampo label="Tipo de Servicio" value={datosReclamo.tipoServicio} />
            <ResumenCampo label="Oficina" value={datosReclamo.oficina} />
          </ResumenBloque>

          {/* Detalle del Reclamo */}
          <ResumenBloque icon={FileText} title="Detalle del Reclamo" color="yellow">
            <ResumenCampo
              label="Motivo"
              value={motivosMap[datosReclamo.motivoReclamo] || datosReclamo.motivoReclamo}
            />
            {datosReclamo.montoReclamado && (
              <ResumenCampo label="Monto reclamado" value={`S/ ${datosReclamo.montoReclamado}`} />
            )}
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-500 mb-1">Descripción</p>
              <div className="bg-white border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {datosReclamo.descripcionDetallada}
                </p>
              </div>
            </div>
          </ResumenBloque>

          {/* Evidencias */}
          <ResumenBloque icon={Paperclip} title="Evidencias y Firma" color="red">
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-500 mb-2">Archivos adjuntos ({archivosEvidencia.length})</p>
              <div className="flex flex-wrap gap-2">
                {archivosEvidencia.map((archivo, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-lg text-xs font-medium text-gray-700"
                  >
                    📎 {archivo.name}
                  </span>
                ))}
              </div>
            </div>
            <ResumenCampo label="Firma digital" value={datosReclamo.firmaDigital} />
            <ResumenCampo label="Acepta políticas" value={datosReclamo.aceptaPoliticas ? '✓ Sí' : '✗ No'} />
          </ResumenBloque>

          {/* Nota final */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-lg flex-shrink-0">ℹ️</span>
            <p className="text-xs text-gray-600">
              Al confirmar, autorizas el procesamiento de tu reclamo conforme a nuestras políticas de privacidad. 
              La información proporcionada es verídica y de tu entera responsabilidad.
            </p>
          </div>

          <StepNavigation
            onSiguiente={enviarReclamo}
            onVolver={anteriorPaso}
            textoSiguiente="Confirmar y Enviar Reclamo"
            deshabilitarSiguiente={isLocked}
            esUltimoPaso={true}
          />

          {/* Footer */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              ¿Necesitas ayuda? <span className="font-medium">📞 (01) 555-5555</span> · <span className="font-medium">📧 reclamos@karsilcargo.com.pe</span>
            </p>
          </div>
        </div>
      </FormCard>

      {isLocked && <LoadingOverlay mensaje="Registrando reclamo..." />}

      <ModalConfirmacion
        isOpen={mostrarExito}
        mensaje="¡Tu reclamo ha sido registrado!"
        submensaje={submensaje}
        onCerrar={cerrarYReiniciar}
      />
    </div>
  );
};

export default ResumenConfirmacion;