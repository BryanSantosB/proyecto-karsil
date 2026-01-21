import React from 'react';
import { useForm } from "../../../context/FormContext";
import NavegacionPasos from "../../../components/ui/NavegacionPasos"; // Usamos el que creamos antes
import CardResumenRuta from "../../../components/shared/CardResumenRuta";
import InfoPaqueteGrid from "../../../components/shared/InfoPaqueteGrid";

const ResumenTotal = () => {
  const { formData, anteriorPaso } = useForm();

  const handleConfirmar = () => {
    console.log("Datos Finales Enviados:", formData);
    // Aquí iría tu llamada a la API
  };

  return (
    <div className="container d-flex justify-content-center pb-5 ">
      <div className="card shadow p-4 border-0 p-5 w-100" style={{ maxWidth: '850px' }}>
        <h2 className="text-center mb-4 fw-bold">Resumen del Envío</h2>

        <div className="row g-4">
          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3">1. Información de Ruta</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <CardResumenRuta 
                  titulo="ORIGEN" 
                  tipo={formData.origen.tipo} 
                  datos={formData.origen}
                  colorPrincipal="#8E24AA"
                  bgColor="#F3E5F5"
                />
              </div>
              <div className="col-md-6">
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

          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3">2. Detalles del Paquete</h5>
            <InfoPaqueteGrid paquete={formData.paquete} />
          </div>

          <div className="col-12 mt-2">
            <NavegacionPasos 
              onSiguiente={handleConfirmar}
              onVolver={anteriorPaso}
              textoSiguiente="CONFIRMAR PEDIDO"
              mostrarVolver={true}
            />
            <p className="text-center text-muted small mt-2">
              Al confirmar, aceptas nuestros términos de servicio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenTotal;