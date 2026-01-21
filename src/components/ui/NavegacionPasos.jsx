import React from 'react';

const NavegacionPasos = ({ 
  onSiguiente, 
  onVolver, 
  textoSiguiente = "Siguiente", 
  mostrarVolver = true,
  deshabilitado = false 
}) => {
  return (
    <div className="col-12 d-flex flex-column align-items-center gap-2">
      {/* Botón Principal (Siguiente/Confirmar) */}
      <button
        onClick={onSiguiente}
        disabled={deshabilitado}
        className="btn py-2 px-5 rounded-pill shadow-sm fw-bold"
        style={{ 
          backgroundColor: '#E0D7FF', 
          color: '#000', 
          minWidth: '200px',
          opacity: deshabilitado ? 0.6 : 1,
          cursor: deshabilitado ? 'not-allowed' : 'pointer'
        }}
      >
        {textoSiguiente}
      </button>

      {/* Botón Secundario (Volver) */}
      {mostrarVolver && (
        <button 
          type="button"
          onClick={onVolver}
          className="btn btn-link btn-sm text-muted text-decoration-none"
        >
          Volver
        </button>
      )}
    </div>
  );
};

export default NavegacionPasos;