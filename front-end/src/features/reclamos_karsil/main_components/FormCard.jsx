import React from 'react';

/**
 * FormCard - Reemplaza NeumorphicContainer para el flujo de reclamos
 * Diseño limpio, blanco, con sombra suave y bordes redondeados
 */
const FormCard = ({ children, className = '' }) => {
  return (
    <div className={`
      w-full max-w-3xl mx-auto
      bg-white rounded-2xl
      border border-gray-200
      shadow-sm
      px-6 py-8 md:px-10 md:py-10
      ${className}
    `}>
      {children}
    </div>
  );
};

export default FormCard;