import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ButtonFlotante = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        to="/consultar-reclamo"
        className="group flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full border-2 border-primary-primary/20 hover:border-primary-primary/40 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
      >
        {/* Icono de lupa */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-primary/10 group-hover:bg-primary-primary/20 transition-colors duration-300">
          <svg
            className="w-5 h-5 text-primary-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Texto */}
        <span className="font-semibold text-primary-primary pr-2 whitespace-nowrap">
          Seguimiento de Reclamo
        </span>
      </Link>
    </motion.div>
  );
};

export default ButtonFlotante;