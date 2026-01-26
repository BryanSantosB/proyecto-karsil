import styles from './CustomSelect.module.css';

const CustomSelect = ({ value, onChange, options, placeholder = "Seleccionar...", val, lab}) => {
  return (
    <div className={styles.formGroup}>
      <select
        className={styles.selectInput}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={val ? opt[val] : opt.value} value={val ? opt[val] : opt.value}>
            {lab ? opt[lab] : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;