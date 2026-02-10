import React from 'react';

/**
 * DocumentTypeSelector - Reemplaza SelectorModalidad para tipos de documento
 * Selector visual de tarjetas en fila, responsive
 */
const DocumentTypeSelector = ({ opciones = [], valorSeleccionado, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {opciones.map((opcion) => {
        const isSelected = valorSeleccionado === opcion.value;
        return (
          <button
            key={opcion.value}
            type="button"
            onClick={() => onChange(opcion.value)}
            className={`
              flex flex-col items-center justify-center gap-2
              p-3 rounded-xl border-2 transition-all duration-200
              ${isSelected
                ? 'border-primary-primary bg-primary-primary/5 text-primary-primary'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {opcion.icon && (
              <img
                src={opcion.icon}
                alt={opcion.nombre}
                className="w-7 h-7 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <span className={`text-xs font-semibold ${isSelected ? 'text-primary-primary' : 'text-gray-700'}`}>
              {opcion.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DocumentTypeSelector;