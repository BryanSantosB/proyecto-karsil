const Stepper = ({ pasoActual }) => {
  const pasos = [
    { id: 1, nombre: "Ruta" },
    { id: 2, nombre: "Paquete" },
    { id: 3, nombre: "Categoría" },
    { id: 4, nombre: "Datos" },
    { id: 5, nombre: "Cotización" },
  ];

  return (
    <div className="w-full py-4 px-2">
      <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
        
        {/* Línea de fondo (Gris) */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />

        {/* Línea de progreso activa */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-slate-800 transition-all duration-500 ease-in-out -translate-y-1/2"
          style={{ width: `${((pasoActual - 1) / (pasos.length - 1)) * 100}%` }}
        />

        {/* Círculos y Etiquetas */}
        {pasos.map((paso) => {
          const isActive = paso.id <= pasoActual;
          const isCompleted = paso.id < pasoActual;

          return (
            <div key={paso.id} className="relative z-10 flex flex-column items-center">
              {/* Círculo */}
              <div
                className={`
                  flex items-center justify-center rounded-full border-2 transition-all duration-300
                  w-8 h-8 text-xs       /* Móvil */
                  md:w-10 md:h-10 md:text-sm /* Desktop */
                  ${isActive 
                    ? "bg-slate-800 border-slate-800 text-white shadow-md" 
                    : "bg-white border-gray-300 text-primary-primary"}
                `}
              >
                {isCompleted ? (
                  <span className="font-bold text-lg">✓</span>
                ) : (
                  <span className="font-bold">{paso.id}</span>
                )}
              </div>

              {/* Texto (Nombre del paso) */}
              <div className="absolute top-full mt-2 flex flex-col items-center">
                <span className={`
                  whitespace-nowrap font-medium transition-colors duration-300
                  text-[10px] md:text-xs /* Texto más pequeño en móvil */
                  ${isActive ? "text-slate-800" : "text-gray-400"}
                `}>
                  {paso.nombre}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;