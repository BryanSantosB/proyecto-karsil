import styles from './CustomSelect.module.css';

const CustomSelect = ({ value, onChange, options, placeholder = "Seleccionar..."}) => {
  return (
    <div className={styles.formGroup}>
      <select
        className={styles.selectInput}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;