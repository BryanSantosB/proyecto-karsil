import { useEffect, useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import CustomInput from "components/ui/CustomInput/CustomInput";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";
import { api } from "services/api";
import FormCard from "../main_components/FormCard";
import StepHeader from "../main_components/StepHeader";
import FormField, { TextareaInput } from "../main_components/FormField";
import StepNavigation from "../main_components/StepNavigation";

const DetalleReclamo = () => {
  const { datosReclamo, actualizarDatos, siguientePaso, anteriorPaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [motivosReclamo, setMotivosReclamo] = useState([]);

  useEffect(() => {
    api.get("/reclamos/motivos")
      .then((res) => setMotivosReclamo(res.data))
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los motivos de reclamo.");
      });
  }, []);

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);
    try {
      const { motivoReclamo, descripcionDetallada } = datosReclamo;
      if (!motivoReclamo)                           return setError("Debes seleccionar el motivo principal de tu reclamo.");
      if (!descripcionDetallada.trim())             return setError("La descripción del reclamo es obligatoria.");
      if (descripcionDetallada.trim().length < 20)  return setError("La descripción debe tener al menos 20 caracteres.");
      if (descripcionDetallada.trim().length > 1000) return setError("La descripción no puede exceder los 1000 caracteres.");
      setError("");
      siguientePaso();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al validar los datos.");
    } finally {
      setIsLocked(false);
    }
  };

  const handleChangeMotivoReclamo = (e) => {
    handleChange("motivoReclamo", e.target.value);
    const motivoOriginal = motivosReclamo.find((a) => a.codigo === e.target.value);
    if (motivoOriginal) handleChange("motivoReclamoId", motivoOriginal.id);
  };

  const handleChange = (campo, valor) => {
    actualizarDatos(campo, valor);
    setError("");
  };

  const caracteresUsados = datosReclamo.descripcionDetallada.length;
  const caracteresRestantes = 1000 - caracteresUsados;
  const descripcionValida = caracteresUsados >= 20;

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <FormCard>
        <StepHeader
          icon="📝"
          title="Detalle de la Reclamación"
          description="Describe detalladamente tu reclamo para que podamos atenderlo"
        />

        <div className="space-y-5">
          {/* Motivo */}
          <FormField label="Motivo del Reclamo" required>
            <CustomSelect
              placeholder="Selecciona el motivo"
              value={datosReclamo.motivoReclamo}
              options={motivosReclamo}
              onChange={handleChangeMotivoReclamo}
              val="codigo"
              lab="nombre"
            />
          </FormField>

          {/* Descripción */}
          <FormField label="Descripción Detallada del Hecho" required>
            <TextareaInput
              rows={7}
              placeholder={`Describe detalladamente lo sucedido. Incluye:\n• Qué ocurrió exactamente\n• Cuándo y dónde sucedió\n• Personas involucradas (si aplica)\n• Cualquier detalle que nos ayude a resolver tu caso`}
              value={datosReclamo.descripcionDetallada}
              onChange={(e) => handleChange("descripcionDetallada", e.target.value)}
              maxLength={1000}
            />
            {/* Barra de progreso de caracteres */}
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs font-medium transition-colors ${descripcionValida ? 'text-green-600' : 'text-gray-400'}`}>
                {descripcionValida ? '✓ Descripción válida' : `Mínimo 20 caracteres (${caracteresUsados}/20)`}
              </span>
              <span className={`text-xs ${caracteresRestantes < 100 ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                {caracteresRestantes} restantes
              </span>
            </div>
            {/* Barra visual */}
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${descripcionValida ? 'bg-green-500' : 'bg-gray-300'}`}
                style={{ width: `${Math.min((caracteresUsados / 1000) * 100, 100)}%` }}
              />
            </div>
          </FormField>

          {/* Monto reclamado */}
          <FormField
            label="Monto Reclamado"
            hint="Opcional — Solo si solicitas compensación económica"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">S/</span>
              <CustomInput
                name="montoReclamado"
                type="number"
                placeholder="0.00"
                value={datosReclamo.montoReclamado}
                onChange={(e) => handleChange("montoReclamado", e.target.value)}
                step="0.01"
                min="0"
                className="pl-9"
              />
            </div>
          </FormField>

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

export default DetalleReclamo;