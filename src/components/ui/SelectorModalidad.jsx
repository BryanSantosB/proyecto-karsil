import React from 'react';
import styles from './SelectorModalidad.module.css';

const SelectorModalidad = ({ opciones, valorSeleccionado, onChange }) => {
  return (
    <div className={styles.optionContainer}>
      {opciones.map((opcion) => (
        <label key={opcion.value} className={styles.optionLabel}>
          <input
            type="radio"
            name={opcion.value} // Nombre único para el grupo
            value={opcion.value}
            checked={valorSeleccionado === opcion.value}
            onChange={() => onChange(opcion.value)}
          />
          <span className={styles.customRadio}>
            {opcion.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SelectorModalidad;