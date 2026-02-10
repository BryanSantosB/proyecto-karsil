import React from "react";

const StepperReclamos = ({ pasoActual, title, message, pasos }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 px-4">

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h1>
        {message && (
          <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-lg mx-auto">
            {message}
          </p>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="flex items-center">

          {pasos.map((paso, index) => {
            const completado = paso.num < pasoActual;
            const activo = paso.num === pasoActual;

            return (
              <React.Fragment key={paso.num}>
                {/* Paso */}
                <div className="flex flex-col items-center flex-shrink-0 w-20">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${
                        completado
                          ? "bg-green-500 border-green-500 text-white"
                          : activo
                          ? "bg-white border-primary-primary shadow-md scale-110"
                          : "bg-white border-gray-200 text-gray-400"
                      }
                    `}
                  >
                    {completado ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : paso.icono ? (
                      <img
                        src={`${process.env.REACT_APP_API_UR}${paso.icono}`}
                        alt=""
                        className={`w-5 h-5 ${activo ? "" : "opacity-40"}`}
                      />
                    ) : (
                      paso.num
                    )}
                  </div>

                  <p
                    className={`
                      mt-2 text-xs text-center max-w-[72px]
                      ${
                        activo
                          ? "text-primary-primary"
                          : completado
                          ? "text-gray-600"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {paso.titulo}
                  </p>
                </div>

                {/* Línea entre pasos */}
                {index < pasos.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 transition-colors duration-300
                      ${
                        paso.num < pasoActual
                          ? "bg-primary-primary"
                          : "bg-gray-200"
                      }
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-center gap-1.5">
        {pasos.map((paso, index) => {
          const completado = paso.num < pasoActual;
          const activo = paso.num === pasoActual;

          return (
            <React.Fragment key={paso.num}>
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    activo
                      ? "bg-primary-primary text-white scale-110"
                      : completado
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }
                `}
              >
                {completado ? "✓" : paso.num}
              </div>

              {index < pasos.length - 1 && (
                <div
                  className={`
                    h-0.5 w-6
                    ${completado ? "bg-green-500" : "bg-gray-200"}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Indicador */}
      <p className="text-center text-xs font-semibold text-primary-primary mt-3">
        Paso {pasoActual} de {pasos.length}
        {pasos[pasoActual - 1] && (
          <span className="text-gray-400 font-normal">
            {" "}
            · {pasos[pasoActual - 1].titulo}
          </span>
        )}
      </p>
    </div>
  );
};

export default StepperReclamos;
