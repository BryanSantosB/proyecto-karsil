import React from 'react';

const CustomInput = ({ 
  label,
  name,
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error = false,
  errorMessage = "",
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      
      <input
        type={type}
        name={name}
        className={`
          w-full h-12 px-4 py-2
          text-base text-gray-700 bg-white
          border-2 rounded-xl outline-none 
          transition-all duration-200
          placeholder:text-gray-400
          hover:border-gray-300
          focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10
          ${error 
            ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-red-500/10' 
            : 'border-gray-100'
          }
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />

      {error && errorMessage && (
        <span className="text-xs text-red-600 ml-1 flex items-center gap-1">
          <span>●</span>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CustomInput;