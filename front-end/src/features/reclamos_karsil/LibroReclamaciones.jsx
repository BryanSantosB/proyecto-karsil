import { useReclamo, ReclamoProvider } from "context/ReclamoContext.jsx";
import DatosCliente from "./steps/DatosCliente.jsx";
import InformacionServicio from "./steps/InformacionServicio.jsx";
import DetalleReclamo from "./steps/DetalleReclamo.jsx";
import EvidenciasFinalizacion from "./steps/EvidenciasFinalizacion.jsx";
import ResumenConfirmacion from "./steps/ResumenConfirmacion.jsx";
import { motion, AnimatePresence } from "framer-motion";
import StepperReclamos from "components/ui/Strepper/StrepperReclamos.jsx";
import { pasosReclamo } from "data/pasosStreppers.js";

const ContenidoLibroReclamos = () => {
  const { paso } = useReclamo();

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return <DatosCliente key="paso1" />;
      case 2:
        return <InformacionServicio key="paso2" />;
      case 3:
        return <DetalleReclamo key="paso3" />;
      case 4:
        return <EvidenciasFinalizacion key="paso4" />;
      case 5:
        return <ResumenConfirmacion key="paso5" />;
      default:
        return <DatosCliente key="paso1" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Barra de pasos visual */}
        <StepperReclamos pasoActual={paso} pasos={pasosReclamo} title="Libro de reclamaciones" message="Conforme a lo establecido en el Código de Protección y Defensa del Consumidor" />

        {/* Animación de transición entre componentes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={paso}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPaso()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const LibroReclamos = () => (
  <ReclamoProvider>
    <ContenidoLibroReclamos />
  </ReclamoProvider>
);

export default LibroReclamos;