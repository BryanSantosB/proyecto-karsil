import {useForm, FormProvider } from "../../context/FormContext.jsx";
import SeccionEnvio from "./steps/SeccionEnvio";
import SeccionPaquete from "./steps/SeccionPaquete.jsx";
import SeccionTipoPaquete from "./steps/SeccionTipoPaquete.jsx";
import ResumenTotal from "./steps/ResumenTotal.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "../../components/ui/Strepper/Stepper.jsx";

const ContenidoCalculadora = () => {
  const { paso } = useForm();

  const renderPaso = () => {
    switch (paso) {
      case 1: return <SeccionEnvio key="paso1" />;
      case 2: return <SeccionPaquete key="paso2" />;
      case 3: return <SeccionTipoPaquete key="paso3" />;
      case 4: return <ResumenTotal key="paso4" />;
      default: return <SeccionEnvio key="paso1" />;
    }
  };

  return (
    <div className="container py-2">
      {/* 1. Barra de pasos visual */}
      <Stepper pasoActual={paso} />

      {/* 2. Animación de transición entre componentes */}
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
  );
};

const CalculadoraEnvio = () => (
  <FormProvider>
    <ContenidoCalculadora />
  </FormProvider>
);

export default CalculadoraEnvio;