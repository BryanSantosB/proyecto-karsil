import { useReclamo, ReclamoProvider } from "context/ReclamoContext.jsx";
import DatosCliente from "./steps/DatosCliente.jsx";
import InformacionServicio from "./steps/InformacionServicio.jsx";
import DetalleReclamo from "./steps/DetalleReclamo.jsx";
import EvidenciasFinalizacion from "./steps/EvidenciasFinalizacion.jsx";
import ResumenConfirmacion from "./steps/ResumenConfirmacion.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ButtonFlotante from "components/ui/ButtonFlotante/ButtonFlotante.jsx";
import { pasosReclamo } from "data/pasosStreppers.js";

// Stepper horizontal minimalista
const StepperHorizontal = ({ pasoActual, pasos, title, message }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      {/* Título */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {message && <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto leading-snug">{message}</p>}
      </div>

      {/* Pasos */}
      <div className="relative flex items-center justify-between">
        {/* Línea de fondo */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        {/* Línea de progreso */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-primary-primary z-0 transition-all duration-500"
          style={{ width: `${((pasoActual - 1) / (pasos.length - 1)) * 100}%` }}
        />

        {pasos.map((paso, index) => {
          const numero = index + 1;
          const completado = pasoActual > numero;
          const activo = pasoActual === numero;

          return (
            <div key={index} className="relative flex flex-col items-center z-10 flex-1">
              {/* Círculo */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                border-2 transition-all duration-300
                ${completado
                  ? 'bg-primary-primary border-primary-primary text-white'
                  : activo
                    ? 'bg-white border-primary-primary text-primary-primary shadow-md'
                    : 'bg-white border-gray-200 text-gray-400'
                }
              `}>
                {completado ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : numero}
              </div>

              {/* Etiqueta */}
              <p className={`
                mt-2 text-xs font-medium text-center leading-tight max-w-16 hidden sm:block
                ${activo ? 'text-primary-primary' : completado ? 'text-gray-600' : 'text-gray-400'}
              `}>
                {paso.label || paso.titulo || paso.nombre || `Paso ${numero}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ContenidoLibroReclamos = () => {
  const { paso } = useReclamo();

  const renderPaso = () => {
    switch (paso) {
      case 1: return <DatosCliente key="paso1" />;
      case 2: return <InformacionServicio key="paso2" />;
      case 3: return <DetalleReclamo key="paso3" />;
      case 4: return <EvidenciasFinalizacion key="paso4" />;
      case 5: return <ResumenConfirmacion key="paso5" />;
      default: return <DatosCliente key="paso1" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Stepper */}
        <StepperHorizontal
          pasoActual={paso}
          pasos={pasosReclamo}
          title="Libro de Reclamaciones"
          message="Conforme a lo establecido en el Código de Protección y Defensa del Consumidor"
        />

        {/* Paso actual con animación */}
        <AnimatePresence mode="wait">
          <motion.div
            key={paso}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderPaso()}
          </motion.div>
        </AnimatePresence>
      </div>

      <ButtonFlotante />
    </div>
  );
};

const LibroReclamos = () => (
  <ReclamoProvider>
    <ContenidoLibroReclamos />
  </ReclamoProvider>
);

export default LibroReclamos;