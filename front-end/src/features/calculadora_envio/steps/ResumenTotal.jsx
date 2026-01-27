import React, { useEffect, useState } from "react";
import { useForm } from "context/FormContext";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import CardResumenRuta from "components/shared/CardResumenRuta";
import InfoPaqueteGrid from "components/shared/InfoPaqueteGrid";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import { cotizarEnvio, crearCotizacion } from "services/cotizaciones";
import ModalConfirmacion from "components/ui/ModalConfirmacion/ModalConfirmacion";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import LoadingOverlay from "components/ui/LoadingOverlay/LoadingOverlay";


const ResumenTotal = () => {
  const { formData, anteriorPaso } = useForm();
  const [cotizacion, setCotizacion] = useState(null);
  const [cotizando, setCotizando] = useState(false);

  const [mostrarExito, setMostrarExito] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmarYEnviar = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await crearCotizacion(formData);
      setMostrarExito(true);
    } catch (error) {
      setError(
        "Error al enviar el correo. Inténtalo nuevamente." + error.message,
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cotizar = async () => {
      try {
        setCotizando(true);
        const res = await cotizarEnvio(formData);
        setCotizacion(res);
      } catch (err) {
        setError(
          err.response?.data?.error || "Error al calcular la cotización",
        );
        setCotizacion(null);
      } finally {
        setCotizando(false);
      }
    };

    // solo cotiza si hay datos mínimos
    if (formData?.origen && formData?.destino && formData?.paquete) {
      cotizar();
    }
  }, [formData]);

  const cerrarYReiniciar = () => {
    setMostrarExito(false);
    window.location.href = "/";
  };

  return (
    <div className="container-fluid d-flex justify-content-center pb-5 px-2">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer
        maxWidth="900px"
        className="mx-auto my-2 my-md-4 p-3 p-md-5"
      >
        <h2 className="text-center mb-4 fw-bold fs-3 fs-md-2">
          Resumen del Envío
        </h2>

        <div className="row g-4">
          {/* SECCIÓN DE RUTA */}
          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3 border-bottom pb-2">
              1. Información de Ruta
            </h5>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <CardResumenRuta
                  titulo="ORIGEN"
                  tipo={formData.origen.tipo}
                  datos={formData.origen}
                  colorPrincipal="#8E24AA"
                  bgColor="#F3E5F5"
                />
              </div>
              <div className="col-12 col-md-6">
                <CardResumenRuta
                  titulo="DESTINO"
                  tipo={formData.destino.tipo}
                  datos={formData.destino}
                  colorPrincipal="#1E88E5"
                  bgColor="#E3F2FD"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN DE PAQUETE */}
          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3 border-bottom pb-2">
              2. Detalles del Paquete
            </h5>
            {/* Asegúrate de que InfoPaqueteGrid también use col-12 col-md-X internamente */}
            <div className="bg-light rounded-3 p-2 p-md-0 bg-md-transparent">
              <InfoPaqueteGrid paquete={formData.paquete} />
            </div>
          </div>

          {/* ACCIONES FINALES */}
          {cotizacion && (
            <>
              <p className="text-sm text-gray-400">
                Peso cobrable: {cotizacion.pesoCobrable.toFixed(2)} kg
              </p>

              <p className="text-xl font-bold text-green-500">
                Precio estimado: S/ {cotizacion.total.toFixed(2)}
              </p>
            </>
          )} 
          {!cotizacion &&  !cotizando && (
            <p className="text-sm text-gray-400">
              Completa los datos de origen, destino y paquete para ver el precio
            </p>
          )}

          {}{cotizando && (
            <LoadingOverlay mensaje="Cargando Página..." />
          )}

          <p className="text-xs text-gray-500">
            * Precio referencial, sujeto a validación
          </p>

          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={confirmarYEnviar}
              onVolver={anteriorPaso}
              textoSiguiente="CONFIRMAR ENVÍO"
              mostrarVolver={true}
              disabled={loading}
            />

            {loading && <LoadingOverlay mensaje="Enviando cotización..." />}

            <p className="text-center text-muted small mt-3 px-3">
              Al confirmar, aceptas nuestros términos de servicio y políticas de
              privacidad.
            </p>
          </div>
        </div>
      </NeumorphicContainer>

      <ModalConfirmacion
        isOpen={mostrarExito}
        mensaje="¡Tu envío ha sido registrado!"
        submensaje="Un asesor de Karsil revisará los detalles y te contactará por WhatsApp en breve."
        onCerrar={cerrarYReiniciar}
      />
    </div>
  );
};

export default ResumenTotal;
