import React from 'react';

const CustomSelect = ({ 
  label,
  name,
  value, 
  onChange, 
  options = [], 
  placeholder = "Seleccionar...", 
  val, 
  lab,
  error = false,
  errorMessage = "",
  ...props 
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  const getNestedValue = (obj, path) => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };


  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}

      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full h-12 px-4 py-2
            text-base text-gray-700 bg-white
            border-2 rounded-xl outline-none 
            appearance-none cursor-pointer
            transition-all duration-200
            hover:border-gray-300
            focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10
            ${error 
              ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-red-500/10' 
              : 'border-gray-100'
            }
          `}
          {...props}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {safeOptions.map((opt) => (
            <option 
              key={val ? getNestedValue(opt, val) : opt.value}
              value={val ? getNestedValue(opt, val) : opt.value}
              className="text-gray-900"
            >
              {lab ? getNestedValue(opt, lab) : opt.label}
            </option>
          ))}
        </select>

        {/* Flecha estilizada como la de tu imagen */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {error && errorMessage && (
        <span className="text-xs text-red-600 ml-1 flex items-center gap-1 animate-fadeIn">
          <span>●</span> {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;