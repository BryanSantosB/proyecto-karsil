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
    const regexBasura = /([a-z])\1{3,}/i; // Detecta cosas como "aaaaa"
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
    <div>
      {/* Alerta de error visual */}
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      {/* Cards de origen y destino */}
      <div className="d-flex justify-content-center align-items-stretch pb-5 gap-5 ">
        <OrigenCard
          modalidad="recojo"
          modalidadText="Recojo a domicilio"
          agenciaText="Dejaré en agencia"
          title="Origen"
        ></OrigenCard>

        <OrigenCard
          modalidad="entrega"
          modalidadText="Entrega en Domicilio"
          agenciaText="Recoger en agencia"
          title="Destino"
        ></OrigenCard>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100">
        <NavegacionPasos
          onSiguiente={validarYContinuar}
          onVolver={anteriorPaso}
          mostrarVolver={paso > 1}
        />
      </div>
    </div>
  );
};

export default SeccionEnvio;
