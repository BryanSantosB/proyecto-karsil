import React from 'react';

const SelectorModalidad = ({ opciones, valorSeleccionado, onChange, label }) => {
  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {opciones.map((opcion) => {
          const isSelected = valorSeleccionado === opcion.value;
          
          return (
            <label key={opcion.value} className="w-full md:flex-1 cursor-pointer group">
              <input
                type="radio"
                name="modalidad-selector" // Asegúrate de un name único
                value={opcion.value}
                checked={isSelected}
                onChange={() => onChange(opcion.value)}
                className="hidden"
              />
              
              <div className={`
                w-full h-14 sm:h-14 flex items-center justify-center
                px-4 py-2 text-base font-medium gap-3 /* Añadimos gap para separar icono de texto */
                border-2 rounded-xl transition-all duration-200
                ${isSelected 
                  ? 'border-primary-primary bg-primary-primary text-white ring-4 ring-primary-primary/10' 
                  : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}>
                {/* Renderizado del Icono */}
                {opcion.icon && (
                  <img 
                    src={opcion.icon} 
                    alt="" 
                    className={`w-6 h-6 object-contain transition-all duration-200 `}
                    /* 'brightness-0 invert' es un truco de CSS para volver 
                       iconos negros a blanco cuando el fondo es oscuro 
                    */
                  />
                )}
                
                <span>{opcion.label}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectorModalidad;