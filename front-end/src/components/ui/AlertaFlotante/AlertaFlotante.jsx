import { useEffect } from "react";
import { createPortal } from "react-dom";

const AlertaFlotante = ({
  mensaje,
  onClose,
  tipo = "danger", // danger | success | warning | info
  duracion = 5000,
}) => {
  // Autocierre
  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duracion);

    return () => clearTimeout(timer);
  }, [mensaje, duracion, onClose]);

  if (!mensaje) return null;

  const estilos = {
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-400 text-black",
    info: "bg-blue-600 text-white",
  };

  return createPortal(
    <div className="fixed top-5 right-5 z-[99999]">
      <div
        className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-[320px] animate-slide-in ${estilos[tipo]}`}
        role="alert"
      >
        {/* Icono */}
        <span className="text-xl leading-none mt-0.5">
          {tipo === "danger" && "⛔"}
          {tipo === "success" && "✅"}
          {tipo === "warning" && "⚠️"}
          {tipo === "info" && "ℹ️"}
        </span>

        {/* Mensaje */}
        <div className="flex-1">
          <p className="text-sm font-semibold">Atención</p>
          <p className="text-sm opacity-90">{mensaje}</p>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-lg leading-none"
          aria-label="Cerrar alerta"
        >
          ×
        </button>
      </div>

      {/* Animación */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.35s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default AlertaFlotante;
