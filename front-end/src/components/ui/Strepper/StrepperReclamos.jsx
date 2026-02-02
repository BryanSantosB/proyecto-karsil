import React from "react";
import TitleLandingPage from "../TitleLandingPage/TitleLandingPage";

const StepperReclamos = ({ pasoActual, title, message, pasos }) => {

  return (
    <div className="w-full mb-8">
      {/* Header */}
      <TitleLandingPage
        title={title}
        message={message}
      />

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
                      ? "bg-primary-primary text-white shadow-lg shadow-blue-300 scale-110"
                      : paso.num < pasoActual
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {paso.num < pasoActual ? "✓" : 
                  <img 
                    src={process.env.REACT_APP_API_UR+paso.icono} 
                    alt="" 
                    className={`w-6 h-6 object-contain transition-all duration-200 `}
                    /* 'brightness-0 invert' es un truco de CSS para volver 
                       iconos negros a blanco cuando el fondo es oscuro 
                    */
                  />
                }
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
                  ? "bg-primary-primary text-white shadow-lg shadow-blue-300 scale-110"
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
        <p className="text-sm font-bold text-primary-primary">
          Paso {pasoActual} de {pasos.length}
        </p>
      </div>
    </div>
  );
};

export default StepperReclamos;