import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import { api } from "services/api";
import ModalConfirmacion from "components/ui/ModalConfirmacion/ModalConfirmacion";
import LoadingOverlay from "components/ui/LoadingOverlay/LoadingOverlay";

const ResumenConfirmacion = () => {
  const { datosReclamo, archivosEvidencia, anteriorPaso } =
    useReclamo();
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [submensaje, setSubmensaje] = useState("");


  const motivosMap = {
    demora_entrega: "Demora en la entrega",
    producto_danado: "Producto dañado",
    producto_perdido: "Producto perdido o extraviado",
    maltrato_personal: "Maltrato o mala atención del personal",
    error_facturacion: "Error en facturación o cobro",
    servicio_incompleto: "Servicio incompleto",
    falta_informacion: "Falta de información",
    otro: "Otro motivo",
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

      // Debug REAL de FormData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await api.post("/reclamos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //let correo = datosReclamo.email;
      let numeroReclamo = response.data.numeroReclamo;

      console.log("RESPONSE CORREO: ", response.data, "Y NUMERO: ", numeroReclamo);

     // const rescorreo = await api.post("/correo/numeroReclamo", {correo, numeroReclamo})

      setSubmensaje(response.data.numeroReclamo);
      //console.log("RESPONSE CORREO: ", rescorreo.data);
      setMostrarExito(true);

      console.log("Reclamo creado:", response.data);
    } catch (error) {
      console.error("Error al enviar reclamo:", error);
    } finally {
      setIsLocked(false);
    }
  };

  const cerrarYReiniciar = () => {
    setMostrarExito(false);
    window.location.href = "/";
  };

  return (
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante
        mensaje={error}
        onClose={() => setError("")}
        tipo="error"
      />
      {exito && (
        <AlertaFlotante
          mensaje={exito}
          onClose={() => setExito("")}
          tipo="success"
        />
      )}

      <NeumorphicContainer
        width="100%"
        maxWidth="900px"
        className="p-3 p-md-5 mt-3"
      >
        {/* Título del paso */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  Resumen del Reclamo
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Verifica que todos los datos sean correctos antes de enviar
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Alerta de verificación */}
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <strong className="text-green-900">
                  Revisa tu información antes de enviar
                </strong>
                <p className="text-sm text-green-800 mt-1">
                  Verifica que todos los datos sean correctos. Una vez enviado,
                  no podrás modificar el reclamo.
                </p>
              </div>
            </div>
          </div>

          {/* Sección 1: Datos del Cliente */}
          <div className="bg-gray-50 border-l-4 border-blue-500 rounded-lg p-4">
            <h5 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span>👤</span> Datos del Cliente
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Nombre:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.nombreCompleto}
                </p>
              </div>
              <div>
                <p className="text-gray-600">{datosReclamo.tipoDocumento}:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.numeroDocumento}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Teléfono:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.telefono}
                </p>
              </div>
            </div>
          </div>

          {/* Sección 2: Información del Servicio */}
          <div className="bg-gray-50 border-l-4 border-green-500 rounded-lg p-4">
            <h5 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span>📦</span> Información del Servicio
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">N° Guía:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.numeroGuia}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Fecha:</p>
                <p className="font-semibold text-gray-800">
                  {new Date(datosReclamo.fechaServicio).toLocaleDateString(
                    "es-PE",
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Tipo de Servicio:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.tipoServicio}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Oficina:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.oficina}
                </p>
              </div>
            </div>
          </div>

          {/* Sección 3: Detalle del Reclamo */}
          <div className="bg-gray-50 border-l-4 border-yellow-500 rounded-lg p-4">
            <h5 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span>📝</span> Detalle del Reclamo
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Motivo:</p>
                <p className="font-semibold text-gray-800">
                  {motivosMap[datosReclamo.motivoReclamo] ||
                    datosReclamo.motivoReclamo}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Descripción:</p>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {datosReclamo.descripcionDetallada}
                  </p>
                </div>
              </div>
              {datosReclamo.montoReclamado && (
                <div>
                  <p className="text-gray-600">Monto reclamado:</p>
                  <p className="font-semibold text-gray-800">
                    S/ {datosReclamo.montoReclamado}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sección 4: Evidencias */}
          <div className="bg-gray-50 border-l-4 border-red-500 rounded-lg p-4">
            <h5 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span>📎</span> Evidencias
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-2">
                  Archivos adjuntos: {archivosEvidencia.length}
                </p>
                <ul className="space-y-1 text-gray-800">
                  {archivosEvidencia.map((archivo, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {archivo.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-gray-600">Firma:</p>
                <p className="font-semibold text-gray-800">
                  {datosReclamo.firmaDigital}
                </p>
              </div>
            </div>
          </div>

          {/* Nota final */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">ℹ️</div>
              <div className="text-sm">
                <strong className="text-blue-900">Nota:</strong>
                <p className="text-blue-800 mt-1">
                  Al confirmar, aceptas que la información proporcionada es
                  verídica y autorizas el procesamiento de tu reclamo conforme a
                  nuestras políticas de privacidad.
                </p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div className="pt-4">
            <NavegacionPasos
              onSiguiente={enviarReclamo}
              onVolver={anteriorPaso}
              textoSiguiente="Confirmar y Enviar Reclamo"
              deshabilitarSiguiente={isLocked}
            />
          </div>
        </div>

        {/* Footer informativo */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">
            <strong>¿Necesitas ayuda?</strong> Comunícate con nosotros
          </p>
          <p className="text-sm text-gray-500">
            📞 Central telefónica: (01) 555-5555 | 📧
            reclamos@karsilcargo.com.pe
          </p>
        </div>
      </NeumorphicContainer>

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
