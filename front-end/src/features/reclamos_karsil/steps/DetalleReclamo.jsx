import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import CustomInput from "components/ui/CustomInput/CustomInput";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";

const DetalleReclamo = () => {
  const { datosReclamo, actualizarDatos, siguientePaso, anteriorPaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const motivosReclamo = [
    { value: "", label: "Selecciona un motivo" },
    { value: "demora_entrega", label: "Demora en la entrega" },
    { value: "producto_danado", label: "Producto dañado" },
    { value: "producto_perdido", label: "Producto perdido o extraviado" },
    { value: "maltrato_personal", label: "Maltrato o mala atención del personal" },
    { value: "error_facturacion", label: "Error en facturación o cobro" },
    { value: "servicio_incompleto", label: "Servicio incompleto" },
    { value: "falta_informacion", label: "Falta de información" },
    { value: "otro", label: "Otro motivo" },
  ];

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    try {
      const { motivoReclamo, descripcionDetallada } = datosReclamo;

      if (!motivoReclamo) {
        setError("Debes seleccionar el motivo principal de tu reclamo.");
        return;
      }

      if (!descripcionDetallada.trim()) {
        setError("La descripción del reclamo es obligatoria.");
        return;
      }

      if (descripcionDetallada.trim().length < 20) {
        setError("La descripción debe tener al menos 20 caracteres para ser procesada correctamente.");
        return;
      }

      if (descripcionDetallada.trim().length > 1000) {
        setError("La descripción no puede exceder los 1000 caracteres.");
        return;
      }

      setError("");
      siguientePaso();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al validar los datos.");
    } finally {
      setIsLocked(false);
    }
  };

  const handleChange = (campo, valor) => {
    actualizarDatos(campo, valor);
    setError("");
  };

  const caracteresRestantes = 1000 - datosReclamo.descripcionDetallada.length;

  return (
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        {/* Título del paso */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📝</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  Detalle de la Reclamación
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Describe detalladamente tu reclamo para que podamos atenderlo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 g-3">
          {/* Motivo del reclamo */}
          <div className="col-12 px-1">
            <label className="block font-bold text-gray-600 text-sm mb-2">
              Motivo del Reclamo *
            </label>
            <CustomSelect
              placeholder="Motivo del Reclamo"
              value={datosReclamo.motivoReclamo}
              options={motivosReclamo}
              onChange={(e) => handleChange("motivoReclamo", e.target.value)}
            />
          </div>

          {/* Descripción detallada */}
          <div className="col-12 px-1 mt-3">
            <label className="block font-bold text-gray-600 text-sm mb-2">
              Descripción Detallada del Hecho *
            </label>
            <textarea
              className="w-full rounded-xl border-2 border-gray-300 p-4 text-sm focus:border-blue-500 focus:outline-none transition-colors"
              rows="7"
              placeholder="Describe detalladamente lo sucedido. Incluye:
• Qué ocurrió exactamente
• Cuándo sucedió
• Dónde ocurrió
• Personas involucradas (si aplica)
• Cualquier detalle relevante que nos ayude a resolver tu caso"
              value={datosReclamo.descripcionDetallada}
              onChange={(e) => handleChange("descripcionDetallada", e.target.value)}
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <small
                className={
                  datosReclamo.descripcionDetallada.length < 20
                    ? "text-red-600 font-medium"
                    : "text-green-600 font-medium"
                }
              >
                {datosReclamo.descripcionDetallada.length < 20
                  ? `Mínimo 20 caracteres (${datosReclamo.descripcionDetallada.length}/20)`
                  : "✓ Descripción válida"}
              </small>
              <small
                className={
                  caracteresRestantes < 100 ? "text-orange-600" : "text-gray-500"
                }
              >
                {caracteresRestantes} caracteres restantes
              </small>
            </div>
          </div>

          {/* Monto reclamado (opcional) */}
          <div className="col-12 col-md-6 px-1 mt-3">
            <CustomInput
              label="Monto Reclamado (Opcional)"
              name="montoReclamado"
              type="number"
              placeholder="0.00"
              value={datosReclamo.montoReclamado}
              onChange={(e) => handleChange("montoReclamado", e.target.value)}
              step="0.01"
              min="0"
            />
            <small className="text-gray-500 text-xs mt-1 block">
              Solo si solicitas compensación económica
            </small>
          </div>

          {/* Nota de campos obligatorios */}
          <div className="col-12 mt-2">
            <p className="text-xs text-gray-500 text-center">
              * Campos obligatorios
            </p>
          </div>

          {/* Navegación */}
          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
              deshabilitarSiguiente={isLocked}
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default DetalleReclamo;