import { createPortal } from "react-dom";

const LoadingOverlay = ({ mensaje = "Procesando..." }) => {
  // Protección básica (útil si algún día usas SSR)
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-primary-primary/20 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        
        {/* Spinner con efecto de pulso */}
        <div className="relative">
          {/* Círculo exterior con animación de pulso */}
          <div className="absolute inset-0 h-20 w-20 rounded-full bg-primary-primary/20 animate-ping" />
          
          {/* Círculo intermedio */}
          <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-primary-primary/10" />
          
          {/* Spinner principal */}
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-primary border-t-transparent shadow-lg shadow-primary-primary/30" />
          </div>
          
          {/* Punto central brillante */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary-primary shadow-lg shadow-primary-primary/50 animate-pulse" />
          </div>
        </div>

        {/* Texto con estilo moderno */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-white tracking-wide drop-shadow-lg">
            {mensaje}
          </p>
          
          {/* Barra de carga animada */}
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-primary to-primary-primary/60 shadow-lg shadow-primary-primary/30"
              style={{
                animation: "loading 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Animaciones locales */}
      <style>{`
        @keyframes loading {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default LoadingOverlay;
