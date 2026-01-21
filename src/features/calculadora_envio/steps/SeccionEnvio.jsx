import { useState } from "react";
import { useForm } from "context/FormContext";
import OrigenCard from "components/shared/OrigenCard";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";

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
    if (!origen.ciudad) return setError("Selecciona una ciudad de origen.");
    if (origen.tipo === "recojo") {
      if (!esDireccionValida(origen.direccion))
        return setError("La dirección de origen no parece válida.");
      if (!origen.fecha)
        return setError("Selecciona una fecha para el recojo.");
    }
    if (!destino.ciudad) return setError("Selecciona una ciudad de destino.");
    if (destino.tipo === "entrega") {
      if (!esDireccionValida(destino.direccion))
        return setError("La dirección de destino no parece válida.");
    }
    setError("");
    siguientePaso();
  };

  return (
    <div className="container-fluid px-2">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <div className="row g-4 pb-5 justify-content-center align-items-stretch">
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
