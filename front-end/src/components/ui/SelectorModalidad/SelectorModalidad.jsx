import React from 'react';

const SelectorModalidad = ({ opciones, valorSeleccionado, onChange, label }) => {
  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}

      <div className="flex w-full gap-3">
        {opciones.map((opcion) => {
          const isSelected = valorSeleccionado === opcion.value;
          
          return (
            <label key={opcion.value} className="flex-1 cursor-pointer group">
              <input
                type="radio"
                name="modalidad"
                value={opcion.value}
                checked={isSelected}
                onChange={() => onChange(opcion.value)}
                className="hidden"
              />
              
              <div className={`
                w-full h-14 sm:h-12 flex items-center justify-center
                px-3 py-2 text-base font-medium
                border-2 rounded-xl transition-all duration-200
                ${isSelected 
                  ? 'border-primary-primary bg-primary-primary text-white ring-4 ring-primary-primary/10' 
                  : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}>
                {opcion.label}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectorModalidad;