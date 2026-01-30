import React from "react";

const StepperReclamos = ({ pasoActual }) => {
  const pasos = [
    { num: 1, titulo: "Cliente", icono: "👤" },
    { num: 2, titulo: "Servicio", icono: "📦" },
    { num: 3, titulo: "Reclamo", icono: "📝" },
    { num: 4, titulo: "Evidencias", icono: "📎" },
    { num: 5, titulo: "Resumen", icono: "✓" },
  ];

  return (
    <div className="w-full mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mb-3">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#1a237e] mb-2">
            Karsil Cargo
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1a237e] to-[#5c6bc0] mx-auto rounded-full"></div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold uppercase text-[#5c6bc0] mb-2">
          Libro de Reclamaciones
        </h2>
        <p className="text-sm text-gray-600">
          Conforme a lo establecido en el Código de Protección y Defensa del Consumidor
        </p>
      </div>

      {/* Stepper Desktop */}
      <div className="hidden md:flex justify-center items-center gap-2 mb-4">
        {pasos.map((paso, index) => (
          <React.Fragment key={paso.num}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold
                  transition-all duration-300 mx-auto
                  ${
                    paso.num === pasoActual
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-300 scale-110"
                      : paso.num < pasoActual
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {paso.num < pasoActual ? "✓" : paso.icono}
              </div>
              <p className="text-xs mt-2 font-medium text-gray-600">
                {paso.titulo}
              </p>
            </div>
            {index < pasos.length - 1 && (
              <div
                className={`
                  h-1 w-12 mt-2 rounded-full transition-all duration-300
                  ${paso.num < pasoActual ? "bg-green-500" : "bg-gray-200"}
                `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Stepper Mobile */}
      <div className="md:hidden flex justify-center items-center gap-2 mb-4">
        {pasos.map((paso) => (
          <div
            key={paso.num}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
              transition-all duration-300
              ${
                paso.num === pasoActual
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-300 scale-110"
                  : paso.num < pasoActual
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {paso.num < pasoActual ? "✓" : paso.num}
          </div>
        ))}
      </div>

      {/* Progreso actual */}
      <div className="text-center">
        <p className="text-sm font-bold text-blue-600">
          Paso {pasoActual} de {pasos.length}
        </p>
      </div>
    </div>
  );
};

export default StepperReclamos;