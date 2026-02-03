import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import CustomInput from "components/ui/CustomInput/CustomInput";
import LoadingOverlay from "components/ui/LoadingOverlay/LoadingOverlay";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import { useState } from "react";
import { api } from "services/api";
import DetalleReclamo from "./DetalleReclamo";

const ConsultaReclamo = () => {
  const [numeroReclamo, setNumeroReclamo] = useState("");
  const [reclamoData, setReclamoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarReclamo = async () => {
    if (!numeroReclamo.trim()) {
      setError("Debes ingresar un número de reclamo.");
      return;
    }

    setLoading(true);
    setError("");
    setReclamoData(null);

    try {
      const response = await api.get(`/reclamos/${numeroReclamo.trim()}`);
      console.log(response.data.data);
      setReclamoData(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("No se encontró ningún reclamo con ese número.");
      } else {
        setError("Ocurrió un error al buscar el reclamo. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buscarReclamo();
    }
  };

  const limpiarBusqueda = () => {
    setNumeroReclamo("");
    setReclamoData(null);
    setError("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 my-16 py-8 px-2">
      {loading && <LoadingOverlay mensaje="Buscando reclamo..." />}
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Consulta tu Reclamo
          </h1>
          <p className="text-gray-600">
            Ingresa el número de tu reclamo para ver su estado y detalles
          </p>
        </div>

        {/* Buscador */}
        <NeumorphicContainer width="100%" maxWidth="600px" className="p-4 p-md-5 mx-auto mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🔍</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Buscar Reclamo
              </h3>
              <p className="text-sm text-gray-600">
                Número de reclamo o código de seguimiento
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <CustomInput
              label="Número de Reclamo"
              name="numeroReclamo"
              type="text"
              placeholder="Ej: REC-2024-001234"
              value={numeroReclamo}
              onChange={(e) => setNumeroReclamo(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
            />

            <div className="flex gap-3">
              <button
                onClick={buscarReclamo}
                disabled={loading || !numeroReclamo.trim()}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-primary-primary hover:bg-primary-primary/90 active:bg-primary-primary/80 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buscar Reclamo
              </button>

              {(reclamoData || numeroReclamo) && (
                <button
                  onClick={limpiarBusqueda}
                  className="py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </NeumorphicContainer>

        {/* Resultados */}
        {reclamoData && (
          <DetalleReclamo 
            reclamo={reclamoData.data} 
            onCerrar={limpiarBusqueda}
          />
        )}

        {/* Ayuda */}
        {!reclamoData && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="text-4xl mb-3">💡</div>
              <h4 className="font-semibold text-gray-800 mb-2">
                ¿No tienes tu número de reclamo?
              </h4>
              <p className="text-sm text-gray-600 max-w-md">
                Puedes encontrarlo en el correo de confirmación que recibiste
                al registrar tu reclamo o contactando a nuestro centro de atención.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultaReclamo;