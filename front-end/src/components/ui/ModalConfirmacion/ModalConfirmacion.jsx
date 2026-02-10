import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const ModalConfirmacion = ({ isOpen, mensaje, submensaje, onCerrar }) => {
  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99998] flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full"
        >
          {/* Icono de éxito */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-primary/10 mb-4">
            <img
              src={`${process.env.REACT_APP_API_UR}/public/icons/icon_check.png`}
              alt="Éxito"
              className="w-8 h-8 object-contain"
            />
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            ¡Éxito!
          </h3>

          {/* Mensaje */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-base leading-relaxed">
              {mensaje || "El proceso se completó correctamente."}
            </p>
            {submensaje && (
              <p className="text-gray-500 text-sm mt-2">{submensaje}</p>
            )}
          </div>

          {/* Botón */}
          <button
            onClick={onCerrar}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-primary-primary hover:bg-primary-primary/90 active:bg-primary-primary/80 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-primary/50 focus:ring-offset-2"
          >
            Entendido
          </button>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ModalConfirmacion;
