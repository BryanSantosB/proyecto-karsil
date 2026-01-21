const InfoPaqueteGrid = ({ paquete }) => (
  <div className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: '#F8F9FA', border: '1px solid #dee2e6' }}>
    <div className="row align-items-center text-center g-3">
      <div className="col-6 col-md-3 border-end">
        <span className="d-block text-muted small">Peso</span>
        <span className="fs-5 fw-bold">{paquete.peso} kg</span>
      </div>
      <div className="col-6 col-md-3 border-md-end">
        <span className="d-block text-muted small">Dimensiones</span>
        <span className="fw-bold">{paquete.largo}x{paquete.ancho}x{paquete.alto} cm</span>
      </div>
      <div className="col-6 col-md-3 border-end">
        <span className="d-block text-muted small">Método</span>
        <span className="badge bg-dark text-white text-uppercase">{paquete.tipoEnvio || 'N/A'}</span>
      </div>
      <div className="col-6 col-md-3">
        <span className="d-block text-muted small">Categoría</span>
        <span className="fw-bold text-uppercase text-primary">{paquete.categoria || 'General'}</span>
      </div>
    </div>
  </div>
);

export default InfoPaqueteGrid;