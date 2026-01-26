import React, { useState } from 'react';
import { useForm } from "context/FormContext";
import NavegacionPasos from 'components/ui/NavegacionPasos/NavegacionPasos';
import AlertaFlotante from 'components/ui/AlertaFlotante/AlertaFlotante';
import NeumorphicContainer from 'components/ui/NeumorphicContainer/NeumorphicContainer';

const SeccionTipoPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

  const tipos = [
    { id: 'perecible', label: '🍎 Perecible' },
    { id: 'valorizado', label: '💎 Valorizado' },
    { id: 'general', label: '📦 General' },
    { id: 'refrigerado', label: '❄️ Refrigerado' }
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
    <div className="container-fluid px-2 d-flex justify-content-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        <h2 className="text-center mb-4 text-uppercase fw-bold fs-4 fs-md-2">
          Tipo de Paquete
        </h2>

        <div className="row g-3 g-md-4 justify-content-center">
          {tipos.map((tipo) => (
            <div key={tipo.id} className="col-12 col-md-6">
              <button
                type="button"
                onClick={() => seleccionarTipo(tipo.id)}
                className="btn w-100 py-3 rounded-pill border-0 shadow-sm transition-all"
                style={{
                  backgroundColor: formData.paquete.categoria === tipo.id ? 'var(--color-primary)' : '#F8F9FA',
                  color: formData.paquete.categoria === tipo.id ? '#fff' : '#555',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: formData.paquete.categoria === tipo.id ? 'none' : '2px solid #E1D5F5',
                  transform: formData.paquete.categoria === tipo.id ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: formData.paquete.categoria === tipo.id ? '0 4px 15px rgba(142, 124, 195, 0.4)' : 'none'
                }}
              >
                {tipo.label}
              </button>
            </div>
          ))}

          {/* Navegación */}
          <div className="col-12 mt-2">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default SeccionTipoPaquete;