import {useForm, FormProvider } from "context/FormContext.jsx";
import SeccionEnvio from "./steps/SeccionEnvio";
import SeccionPaquete from "./steps/SeccionPaquete.jsx";
import SeccionTipoPaquete from "./steps/SeccionTipoPaquete.jsx";
import ResumenTotal from "./steps/ResumenTotal.jsx";
import { motion, AnimatePresence } from "framer-motion";
import SeccionContacto from "./steps/SeccionContacto";
import StepperReclamos from "components/ui/Strepper/StrepperReclamos";
import { pasosCotizacion } from "data/pasosStreppers";
import { useLayout } from "context/LayoutContext";
//import { useEffect } from "react";

const ContenidoCalculadora = () => {
  const { paso } = useForm();
  const { mode } = useLayout();

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth", 
  //   });
  // }, [paso]);

  const renderPaso = () => {
    switch (paso) {
      case 1: return <SeccionEnvio key="paso1" />;
      case 2: return <SeccionPaquete key="paso2" />;
      case 3: return <SeccionTipoPaquete key="paso3" />;
      case 4: return <SeccionContacto key="paso5" />;
      case 5: return <ResumenTotal key="paso4" />;
      default: return <SeccionEnvio key="paso1" />;
    }
  };

  return (
    <div className={`
        py-2 pt-5
        ${mode === "modal"
          ? "w-full px-4 my-0"
          : "w-responsive container my-5"}
      `} >
      {/* 1. Barra de pasos visual */}
      <StepperReclamos pasoActual={paso} pasos={pasosCotizacion} title="Gestor Dinámico de Cotizaciones" message="Automatización de flujos y vinculación de datos técnicos para una selección de agencias precisa y eficiente." />


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