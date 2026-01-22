import { useState } from "react";
import { useForm } from "context/FormContext";
import OrigenCard from "components/shared/OrigenCard";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import { esRutaDisponible } from "utils/validarRuta";

const SeccionEnvio = () => {
  const { formData, siguientePaso, anteriorPaso, paso } = useForm();
  const [error, setError] = useState("");

  const esDireccionValida = (texto) => {
    if (!texto) return false;
    const regexBasura = /([a-z])\1{3,}/i;
    return texto.length >= 5 && !regexBasura.test(texto);
  };

  const validarYContinuar = () => {
  const { origen, destino } = formData;

  // VALIDACIONES DE ORIGEN
  if (origen.tipo === "recojo") {
    if (!origen.departamento) return setError("Selecciona el departamento de origen.");
    if (!origen.provincia) return setError("Selecciona la provincia de origen.");
    if (!origen.distrito) return setError("Selecciona el distrito de origen.");
    if (!esDireccionValida(origen.direccion)) return setError("Ingresa una dirección de recojo válida.");
    if (!origen.fecha) return setError("Selecciona una fecha para el recojo.");
  } else {
    if (!origen.ciudad) return setError("Selecciona la agencia de origen.");
  }

  // VALIDACIONES DE DESTINO
  if (destino.tipo === "entrega") {
    if (!destino.departamento) return setError("Selecciona el departamento de destino.");
    if (!destino.provincia) return setError("Selecciona la provincia de destino.");
    if (!destino.distrito) return setError("Selecciona el distrito de destino.");
    if (!esDireccionValida(destino.direccion)) return setError("Ingresa una dirección de entrega válida.");
  } else {
    if (!destino.ciudad) return setError("Selecciona la agencia de destino.");
  }

  // VALIDACIONES DE RUTAS DISPONIBLES
  if (!esRutaDisponible(origen, destino)) {
    console.log("Ruta no disponible:", origen, destino);
  return setError(
    "La ruta seleccionada no está disponible. Solo se realizan envíos Lima ↔ Provincia."
  );
}

  // Si pasa todos los filtros
  setError("");
  siguientePaso();
};

  return (
    <div className="container-fluid px-2">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <div className="row g-4 pb-2 justify-content-center align-items-stretch">
        <div className="col-12 col-xl-6 d-flex">
          <OrigenCard
            modalidad="recojo"
            modalidadText="Recojo a domicilio"
            agenciaText="Dejaré en agencia"
            title="Origen"
          />
        </div>

        <div className="col-12 col-xl-6 d-flex">
          <OrigenCard
            modalidad="entrega"
            modalidadText="Entrega en Domicilio"
            agenciaText="Recoger en agencia"
            title="Destino"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <NavegacionPasos
            onSiguiente={validarYContinuar}
            onVolver={anteriorPaso}
            mostrarVolver={paso > 1}
          />
        </div>
      </div>
    </div>
  );
};

export default SeccionEnvio;
