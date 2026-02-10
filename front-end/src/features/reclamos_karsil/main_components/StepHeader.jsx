import React from 'react';

/**
 * StepHeader - Encabezado visual de cada paso del formulario
 * Reemplaza el bloque azul genérico de cada componente
 */
const StepHeader = ({ icon, title, description, step, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        {/* Ícono del paso */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-primary/10 flex items-center justify-center text-2xl">
          {icon}
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-500 mt-1 leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Divisor */}
      <div className="mt-6 h-px bg-gradient-to-r from-primary-primary/30 via-gray-200 to-transparent" />
    </div>
  );
};

export default StepHeader;