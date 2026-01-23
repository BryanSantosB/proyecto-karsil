const LoadingOverlay = ({ mensaje = "Procesando..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/90 px-8 py-6 shadow-xl">
        
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>

        {/* Texto */}
        <p className="text-sm font-medium text-gray-700 tracking-wide">
          {mensaje}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
