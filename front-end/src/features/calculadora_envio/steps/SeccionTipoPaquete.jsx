import React, { useState } from 'react';
import { useForm } from "context/FormContext";
import NavegacionPasos from 'components/ui/NavegacionPasos/NavegacionPasos';
import AlertaFlotante from 'components/ui/AlertaFlotante/AlertaFlotante';
import NeumorphicContainer from 'components/ui/NeumorphicContainer/NeumorphicContainer';
import SelectorModalidad from 'components/ui/SelectorModalidad/SelectorModalidad';

const SeccionTipoPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

  const opcionesCategorias = [
    { value: 'perecible', label: 'Perecible', icon: "http://localhost:4000/public/icons/icon_manzana.png" },
    { value: 'valorizado', label: 'Valorizado', icon: "http://localhost:4000/public/icons/icon_valorizado.png" },
    { value: 'general', label: 'General', icon: "http://localhost:4000/public/icons/icon_caja.png" },
    { value: 'refrigerado', label: 'Refrigerado', icon: "http://localhost:4000/public/icons/icon_refrigerado.png" }
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
    <div className="container-fluid px-2 d-flex justify-content-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        <h2 className="text-center mb-4 text-uppercase fw-bold fs-4 fs-md-2">
          Tipo de Paquete
        </h2>

        <div className="row g-3 g-md-4 justify-content-center">
          
          <SelectorModalidad
            label="Selecciona una Categoría"
            opciones={opcionesCategorias}
            valorSeleccionado={formData.paquete.categoria}
            onChange={(id) => seleccionarTipo(id)}
          />

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