import ButtonAction from '../ButtonAction/ButtonAction';
import styles from './NavegacionPasos.module.css'; // Importación del módulo

const NavegacionPasos = ({ onSiguiente, onVolver, textoSiguiente = "Siguiente", mostrarVolver = true, deshabilitado = false, disable }) => {
  return (
    <div className={styles.container}>
      <ButtonAction
        texto={textoSiguiente}
        onClick={onSiguiente}
        disabled={deshabilitado}
        className="w-full md:w-auto" // Ancho completo en móvil
      />

      {mostrarVolver && (
        <button onClick={onVolver} className={styles.btnVolver}>
          Volver
        </button>
      )}
    </div>
  );
};

export default NavegacionPasos;