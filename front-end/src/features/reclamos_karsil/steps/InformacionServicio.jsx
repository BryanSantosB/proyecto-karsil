import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import CustomInput from "components/ui/CustomInput/CustomInput";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";

const InformacionServicio = () => {
  const { datosReclamo, actualizarDatos, siguientePaso, anteriorPaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const tiposServicio = [
    { value: "", label: "Selecciona un tipo de servicio" },
    { value: "carga_pesada", label: "Carga Pesada" },
    { value: "courier", label: "Courier" },
    { value: "local", label: "Envío Local" },
    { value: "nacional", label: "Envío Nacional" },
    { value: "internacional", label: "Envío Internacional" },
  ];

  const oficinas = [
    { value: "", label: "Selecciona una oficina" },
    { value: "lima_centro", label: "Lima Centro - Av. Abancay 123" },
    { value: "callao", label: "Callao - Av. Colonial 456" },
    { value: "san_isidro", label: "San Isidro - Av. Javier Prado 789" },
    { value: "miraflores", label: "Miraflores - Av. Larco 321" },
    { value: "arequipa", label: "Arequipa - Calle Mercaderes 654" },
    { value: "cusco", label: "Cusco - Av. La Cultura 987" },
    { value: "trujillo", label: "Trujillo - Av. España 147" },
    { value: "piura", label: "Piura - Av. Grau 258" },
    { value: "chiclayo", label: "Chiclayo - Av. Balta 369" },
  ];

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    try {
      const { numeroGuia, fechaServicio, tipoServicio, oficina } = datosReclamo;

      if (!numeroGuia.trim()) {
        setError("El número de guía o tracking es obligatorio para rastrear tu envío.");
        return;
      }

      if (numeroGuia.trim().length < 5) {
        setError("El número de guía debe tener al menos 5 caracteres.");
        return;
      }

      if (!fechaServicio) {
        setError("Debes seleccionar la fecha en que se realizó el servicio.");
        return;
      }

      const fechaSeleccionada = new Date(fechaServicio);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaSeleccionada > hoy) {
        setError("La fecha del servicio no puede ser futura.");
        return;
      }

      if (!tipoServicio) {
        setError("Debes seleccionar el tipo de servicio contratado.");
        return;
      }

      if (!oficina) {
        setError("Debes seleccionar la oficina donde se realizó el servicio.");
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

  return (
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        {/* Título del paso */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📦</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  Información del Servicio
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Proporciona los detalles del servicio para rastrear tu envío
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 g-3">
          {/* Número de guía y fecha */}
          <div className="col-12 col-md-6 px-1">
            <CustomInput
              label="Número de Guía / Tracking *"
              name="numeroGuia"
              type="text"
              placeholder="KC-2024-000000"
              value={datosReclamo.numeroGuia}
              onChange={(e) => handleChange("numeroGuia", e.target.value.toUpperCase())}
            />
            <small className="text-gray-500 text-xs mt-1 block">
              Puedes encontrarlo en tu comprobante de envío
            </small>
          </div>

          <div className="col-12 col-md-6 px-1">
            <CustomInput
              label="Fecha del Servicio *"
              name="fechaServicio"
              type="date"
              value={datosReclamo.fechaServicio}
              onChange={(e) => handleChange("fechaServicio", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Tipo de servicio */}
          <div className="col-12 col-md-6 px-1">
            <label className="block font-bold text-gray-600 text-sm mb-2">
              Tipo de Servicio *
            </label>
            <CustomSelect
              placeholder="Tipo de Servicio"
              value={datosReclamo.tipoServicio}
              options={tiposServicio}
              onChange={(e) => handleChange("tipoServicio", e.target.value)}
            />
          </div>

          {/* Oficina */}
          <div className="col-12 col-md-6 px-1">
            <label className="block font-bold text-gray-600 text-sm mb-2">
              Oficina de Atención *
            </label>
            <CustomSelect
              placeholder="Oficina"
              value={datosReclamo.oficina}
              options={oficinas}
              onChange={(e) => handleChange("oficina", e.target.value)}
            />
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

export default InformacionServicio;