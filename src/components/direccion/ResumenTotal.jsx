import React from 'react';
import { useForm } from "../../context/FormContext";

const ResumenTotal = () => {
  const { formData, anteriorPaso } = useForm();

  // Función para capitalizar textos y manejar vacíos
  const dato = (val) => val && val !== "" ? val : <span className="text-muted italic">No especificado</span>;
  const cap = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";

  return (
    <div className="container d-flex justify-content-center pb-5">
      <div className="card shadow-sm p-4 border-0" style={{ maxWidth: '850px', width: '100%', borderRadius: '25px' }}>
        <h2 className="text-center mb-4 fw-bold">Resumen Completo del Envío</h2>

        <div className="row g-4">
          {/* PASO 1: LOGÍSTICA DE RUTA */}
          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3">1. Información de Ruta</h5>
            <div className="row g-3">
              {/* ORIGEN */}
              <div className="col-md-6">
                <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#F3E5F5', borderLeft: '5px solid #8E24AA' }}>
                  <p className="badge bg-white text-dark mb-2">ORIGEN: {cap(formData.origen.tipo)}</p>
                  <p className="mb-1"><strong>Ciudad:</strong> {dato(formData.origen.ciudad)}</p>
                  <p className="mb-1"><strong>Dirección:</strong> {dato(formData.origen.direccion)}</p>
                  <p className="mb-1"><strong>Referencia:</strong> {dato(formData.origen.referencia)}</p>
                  <p className="mb-0 mt-2"><strong>Fecha:</strong> {dato(formData.origen.fecha)}</p>
                </div>
              </div>
              {/* DESTINO */}
              <div className="col-md-6">
                <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#E3F2FD', borderLeft: '5px solid #1E88E5' }}>
                  <p className="badge bg-white text-dark mb-2">DESTINO: {cap(formData.destino.tipo)}</p>
                  <p className="mb-1"><strong>Ciudad:</strong> {dato(formData.destino.ciudad)}</p>
                  <p className="mb-1"><strong>Dirección:</strong> {dato(formData.destino.direccion)}</p>
                  <p className="mb-1 "><strong>Referencia:</strong> {dato(formData.destino.referencia)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* PASO 2 Y 3: DETALLES DEL PAQUETE */}
          <div className="col-12">
            <h5 className="text-uppercase text-muted small fw-bold mb-3">2. Detalles del Paquete y Servicio</h5>
            <div className="p-4 rounded-4" style={{ backgroundColor: '#F8F9FA', border: '1px solid #dee2e6' }}>
              <div className="row align-items-center text-center">
                <div className="col-md-3 border-end">
                  <span className="d-block text-muted small">Peso</span>
                  <span className="fs-4 fw-bold">{formData.paquete.peso} kg</span>
                </div>
                <div className="col-md-3 border-end">
                  <span className="d-block text-muted small">Dimensiones (LxAnxAl)</span>
                  <span className="fw-bold">
                    {formData.paquete.largo} x {formData.paquete.ancho} x {formData.paquete.alto} cm
                  </span>
                </div>
                <div className="col-md-3 border-end">
                  <span className="d-block text-muted small">Método de Envío</span>
                  <span className="badge bg-dark text-white text-uppercase">{formData.paquete.tipoEnvio || 'No seleccionado'}</span>
                </div>
                <div className="col-md-3">
                  <span className="d-block text-muted small">Categoría</span>
                  <span className="fw-bold text-uppercase text-primary">{formData.paquete.categoria || 'General'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTONES FINALES */}
          <div className="col-12 mt-4 d-flex flex-column align-items-center gap-3">
            <button
              className="btn btn-lg py-3 px-5 rounded-pill shadow fw-bold text-white"
              style={{ backgroundColor: '#673AB7', width: '300px' }}
              onClick={() => console.log("Datos Finales:", formData)}
            >
              CONFIRMAR PEDIDO
            </button>
            
            <button 
              onClick={anteriorPaso}
              className="btn btn-link text-decoration-none text-muted"
            >
              ¿Hay algún error? Volver a editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenTotal;