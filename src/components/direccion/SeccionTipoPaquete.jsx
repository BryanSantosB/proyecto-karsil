import React from 'react';
import { useForm } from "../../context/FormContext";

const SeccionTipoPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();

  // Opciones basadas en tu imagen
  const tipos = [
    { id: 'perecible', label: 'Perecible' },
    { id: 'valorizado', label: 'Valorizado' },
    { id: 'general', label: 'General' },
    { id: 'refrigerado', label: 'Refrigerado' }
  ];

  const seleccionarTipo = (id) => {
    actualizarDatos('paquete', { categoria: id });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow-sm p-4 border-0 w-100" style={{ maxWidth: '800px'}}>
        <h2 className="text-center mb-4 text-uppercase fw-bold">
          Tipo de Paquete
        </h2>

        <div className="row g-4 justify-content-center">
          {tipos.map((tipo) => (
            <div key={tipo.id} className="col-6">
              <button
                type="button"
                onClick={() => seleccionarTipo(tipo.id)}
                className="btn w-100 py-3 rounded-pill border-0 shadow-sm transition-all"
                style={{
                  backgroundColor: formData.paquete.categoria === tipo.id ? '#D1C4E9' : '#E1D5F5',
                  color: '#000',
                  fontSize: '1.1rem',
                  fontWeight: formData.paquete.categoria === tipo.id ? 'bold' : 'normal',
                  transform: formData.paquete.categoria === tipo.id ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {tipo.label}
              </button>
            </div>
          ))}

          {/* Botón Siguiente */}
          <div className="col-12 mt-5 d-flex flex-column align-items-center gap-3">
            <button
              onClick={siguientePaso}
              disabled={!formData.paquete.categoria} // Deshabilitar si no hay selección
              className="btn py-2 px-5 rounded-pill shadow-sm fw-normal"
              style={{ 
                backgroundColor: '#E1D5F5', 
                color: '#000', 
                minWidth: '180px',
                opacity: !formData.paquete.categoria ? 0.6 : 1 
              }}
            >
              Siguiente
            </button>
            
            <button 
              onClick={anteriorPaso}
              className="btn btn-link btn-sm text-muted text-decoration-none"
            >
              volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionTipoPaquete;