import React from 'react';
import styles from './CustomInput.module.css';

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
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        className={`${styles.inputField} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props} // Permite pasar cosas como min, max, step, etc.
      />
      {error && errorMessage && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;