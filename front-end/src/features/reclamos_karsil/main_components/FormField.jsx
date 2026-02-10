import React from 'react';

/**
 * FormField - Wrapper para inputs con label consistente
 * Reemplaza el patrón label + CustomInput repetido en cada paso
 */
export const FormField = ({ label, required, hint, error, children, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

/**
 * TextInput - Input de texto con estilo consistente del sistema
 */
export const TextInput = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        w-full px-4 py-2.5
        bg-gray-50 border border-gray-200 rounded-lg
        text-sm text-gray-900 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary-primary/30 focus:border-primary-primary
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

/**
 * TextareaInput - Textarea con estilo consistente
 */
export const TextareaInput = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`
        w-full px-4 py-3
        bg-gray-50 border border-gray-200 rounded-lg
        text-sm text-gray-900 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary-primary/30 focus:border-primary-primary
        transition-all duration-200 resize-none
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

/**
 * SelectInput - Select con estilo consistente
 */
export const SelectInput = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`
        w-full px-4 py-2.5
        bg-gray-50 border border-gray-200 rounded-lg
        text-sm text-gray-900
        focus:outline-none focus:ring-2 focus:ring-primary-primary/30 focus:border-primary-primary
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
};

export default FormField;