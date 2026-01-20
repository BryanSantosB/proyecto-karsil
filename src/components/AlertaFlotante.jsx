import React, { useEffect } from 'react';

const AlertaFlotante = ({ mensaje, onClose, tipo = "danger" }) => {
  // Autocerrado opcional: se cierra tras 5 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, onClose]);

  if (!mensaje) return null;

  return (
    <div 
      className={`alert alert-${tipo} shadow-lg d-flex align-items-center mb-0`} 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        minWidth: '320px',
        borderRadius: '12px',
        border: 'none',
        animation: 'slideIn 0.4s ease-out'
      }}
      role="alert"
    >
      <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
      <div className="flex-grow-1">
        <small className="fw-bold d-block">Atención</small>
        <span style={{ fontSize: '0.9rem' }}>{mensaje}</span>
      </div>
      <button 
        type="button" 
        className="btn-close ms-2" 
        onClick={onClose}
        style={{ fontSize: '0.7rem' }}
      ></button>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AlertaFlotante;