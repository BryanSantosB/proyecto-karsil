import React, { useEffect, useState } from "react";
import { useForm } from "context/FormContext";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import SelectorModalidad from "components/ui/SelectorModalidad/SelectorModalidad";
import { api } from "services/api";

const SeccionTipoPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [tiposPaquete, setTiposPaquete] = useState([]);

  const seleccionarTipo = (value) => {
    actualizarDatos("paquete", { categoria: value });
    const itemOriginal = tiposPaquete.find((a) => a.value === value);
    actualizarDatos("paquete", { categoriaId: itemOriginal.id });
  };

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    try {
      if (!formData.paquete.categoria) {
        setError("Por favor, selecciona un tipo de paquete para continuar.");
        return;
      }
      setError("");
      siguientePaso();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLocked(false);
    }
  };

  useEffect(() => {
    api
      .get("/paquetes/tipos")
      .then((response) => {
        //actualizarDatos("paquete", response.data);
        setTiposPaquete(response.data.data);
      })
      .catch ((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container-fluid px-2 d-flex justify-content-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer
        width="100%"
        maxWidth="800px"
        className="p-3 p-md-5 mt-3"
      >
        <h2 className="text-center mb-4 text-uppercase fw-bold fs-4 fs-md-2">
          Tipo de Paquete
        </h2>

        <div className="row g-3 g-md-4 justify-content-center">
          <SelectorModalidad
            label="Selecciona una Categoría"
            opciones={tiposPaquete}
            valorSeleccionado={formData.paquete.categoria}
            onChange={(value) => seleccionarTipo(value)}
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
