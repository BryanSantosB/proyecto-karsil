import React from 'react';
import { useForm } from "context/FormContext";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import CardResumenRuta from "components/shared/CardResumenRuta";
import InfoPaqueteGrid from "components/shared/InfoPaqueteGrid";
import NeumorphicContainer from 'components/ui/NeumorphicContainer/NeumorphicContainer';

const ResumenTotal = () => {
  const { formData, anteriorPaso } = useForm();

  const handleConfirmar = () => {
    console.log("Datos Finales Enviados:", formData);
    // Lógica de envío
  };

  return (
    <div className="container-fluid d-flex justify-content-center pb-5 px-2">
      
      <NeumorphicContainer maxWidth="900px" className="mx-auto my-2 my-md-4 p-3 p-md-5">
        <h2 className="text-center mb-4 fw-bold fs-3 fs-md-2">Resumen del Envío</h2>

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
          <div className="col-12 mt-4">
            <NavegacionPasos 
              onSiguiente={handleConfirmar}
              onVolver={anteriorPaso}
              textoSiguiente="CONFIRMAR PEDIDO"
              mostrarVolver={true}
            />
            
            <p className="text-center text-muted small mt-3 px-3">
              Al confirmar, aceptas nuestros términos de servicio y políticas de privacidad.
            </p>
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default ResumenTotal;