import React, { useState } from 'react';
import { useForm } from "../../../context/FormContext";
import NavegacionPasos from '../../../components/ui/NavegacionPasos';
import AlertaFlotante from '../../../components/ui/AlertaFlotante';

const SeccionTipoPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

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

  const validarYContinuar = () => {
    if (!formData.paquete.categoria) {
      setError("Por favor, selecciona un tipo de paquete para continuar.");
      return;
    }

    setError("");
    siguientePaso();
  };

  return (
    
    <div className="container d-flex justify-content-center">
      {/* Componente de Alerta */}
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />
        
      <div className="card shadow p-4 border-0 w-100" style={{ maxWidth: '800px'}}>
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
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionTipoPaquete;