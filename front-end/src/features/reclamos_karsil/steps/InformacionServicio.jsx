import { useEffect, useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import CustomInput from "components/ui/CustomInput/CustomInput";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";
import { api } from "services/api";
import FormCard from "../main_components/FormCard";
import StepHeader from "../main_components/StepHeader";
import FormField from "../main_components/FormField";
import StepNavigation from "../main_components/StepNavigation";

const InformacionServicio = () => {
  const { datosReclamo, actualizarDatos, siguientePaso, anteriorPaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  const [tiposPaquete, setTiposPaquete] = useState([]);

  useEffect(() => {
    api.get("/ciudades")
      .then((res) => setCiudades(res.data.data))
      .catch(console.error);

    api.get("/paquetes/tipos")
      .then((res) => setTiposPaquete(res.data.data))
      .catch(console.error);
  }, []);

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);
    try {
      const { numeroGuia, fechaServicio, tipoServicio, oficina } = datosReclamo;
      if (!numeroGuia.trim())           return setError("El número de guía o tracking es obligatorio.");
      if (numeroGuia.trim().length < 5) return setError("El número de guía debe tener al menos 5 caracteres.");
      if (!fechaServicio)               return setError("Debes seleccionar la fecha en que se realizó el servicio.");
      const fechaSeleccionada = new Date(fechaServicio);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaSeleccionada > hoy)      return setError("La fecha del servicio no puede ser futura.");
      if (!tipoServicio)                return setError("Debes seleccionar el tipo de servicio contratado.");
      if (!oficina)                     return setError("Debes seleccionar la oficina donde se realizó el servicio.");
      setError("");
      siguientePaso();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al validar los datos.");
    } finally {
      setIsLocked(false);
    }
  };

  const handleChangeOficina = (e) => {
    handleChange("oficina", e.target.value);
    const oficinaOriginal = ciudades.find((a) => a.nombre === e.target.value);
    if (oficinaOriginal) handleChange("oficinaId", oficinaOriginal.id);
  };

  const handleChangeTipoServicio = (e) => {
    handleChange("tipoServicio", e.target.value);
    const tipoServiceOriginal = tiposPaquete.find((a) => a.nombre === e.target.value);
    if (tipoServiceOriginal) handleChange("tipoServicioId", tipoServiceOriginal.id);
  };

  const handleChange = (campo, valor) => {
    actualizarDatos(campo, valor);
    setError("");
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <FormCard>
        <StepHeader
          icon="📦"
          title="Información del Servicio"
          description="Proporciona los detalles del servicio para rastrear tu envío"
        />

        <div className="space-y-5">
          {/* Número de guía y fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Número de Guía / Tracking"
              required
              hint="Puedes encontrarlo en tu comprobante de envío"
            >
              <CustomInput
                name="numeroGuia"
                type="text"
                placeholder="KC-2024-000000"
                value={datosReclamo.numeroGuia}
                onChange={(e) => handleChange("numeroGuia", e.target.value.toUpperCase())}
              />
            </FormField>

            <FormField label="Fecha del Servicio" required>
              <CustomInput
                name="fechaServicio"
                type="date"
                value={datosReclamo.fechaServicio}
                onChange={(e) => handleChange("fechaServicio", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </FormField>
          </div>

          {/* Tipo de servicio y Oficina */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Tipo de Servicio" required>
              <CustomSelect
                placeholder="Selecciona un tipo"
                value={datosReclamo.tipoServicio}
                options={tiposPaquete}
                val="nombre"
                lab="nombre"
                onChange={handleChangeTipoServicio}
              />
            </FormField>

            <FormField label="Oficina de Atención" required>
              <CustomSelect
                placeholder="Selecciona una oficina"
                value={datosReclamo.oficina}
                options={ciudades}
                val="nombre"
                lab="nombre"
                onChange={handleChangeOficina}
              />
            </FormField>
          </div>

          <p className="text-xs text-gray-400 text-right">* Campos obligatorios</p>

          <StepNavigation
            onSiguiente={validarYContinuar}
            onVolver={anteriorPaso}
            deshabilitarSiguiente={isLocked}
          />
        </div>
      </FormCard>
    </div>
  );
};

export default InformacionServicio;