import styles from './NavegacionPasos.module.css'; // Importación del módulo

const NavegacionPasos = ({ onSiguiente, onVolver, textoSiguiente = "Siguiente", mostrarVolver = true, deshabilitado = false, disable }) => {
  return (
    <div className={styles.container}>
      <button
        onClick={onSiguiente}
        disabled={deshabilitado}
        className={styles.btnSiguiente}
        disable={disable}
      >
        {textoSiguiente}
      </button>

      {mostrarVolver && (
        <button onClick={onVolver} className={styles.btnVolver}>
          Volver
        </button>
      )}
    </div>
  );
};

export default NavegacionPasos;