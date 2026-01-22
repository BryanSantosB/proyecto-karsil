import { motion, AnimatePresence } from "framer-motion";

const ModalConfirmacion = ({ isOpen, mensaje, submensaje, onCerrar }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#F0F2F5] rounded-[30px] p-6 p-md-8 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] max-w-sm w-full text-center"
        >
          {/* Icono Neumórfico con Check */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] mb-4 text-green-500">
             <span className="text-4xl">✅</span>
          </div>

          <h3 className="text-2xl fw-bold text-gray-800 mb-2">
            ¡Éxito!
          </h3>
          
          <p className="text-muted mb-6">
            {mensaje || "El proceso se completó correctamente."}
            {submensaje && <span className="d-block mt-2 small">{submensaje}</span>}
          </p>

          <button
            onClick={onCerrar}
            className="w-full py-3 rounded-pill fw-bold transition-all shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] bg-[#E0D7FF] text-[#4F46E5]"
          >
            Entendido
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModalConfirmacion;