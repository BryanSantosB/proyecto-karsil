import React from "react";
import "./RadioGroup.css";

const RadioGroup = ({ label, opciones, valorSeleccionado, onChange, name }) => {
  return (
    <div className="radio-group-container">
      {label && (
        <label className="radio-group-label text-center mb-3 fw-bold text-muted small">
          {label}
        </label>
      )}
      <div className="radio-group-opciones">
        {opciones.map((opcion) => (
          <label
            key={opcion.value}
            className={`radio-option ${
              valorSeleccionado === opcion.value ? "radio-option-active" : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opcion.value}
              checked={valorSeleccionado === opcion.value}
              onChange={() => onChange(opcion.value)}
              className="radio-input"
            />
            <div className="radio-content">
              {opcion.icon && (
                <img
                  src={opcion.icon}
                  alt={opcion.label}
                  className="radio-icon"
                />
              )}
              <span className="radio-label">{opcion.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;