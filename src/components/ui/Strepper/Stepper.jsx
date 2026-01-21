const Stepper = ({ pasoActual }) => {
  const pasos = [1, 2, 3, 4];
  const nombres = ["Ruta", "Paquete", "Categoría", "Resumen"];

  return (
    <div className="d-flex justify-content-between position-relative mb-5 w-75 mx-auto">
      {/* Línea de fondo */}
      <div className="position-absolute top-50 start-0 translate-middle-y w-100" 
           style={{ height: '2px', backgroundColor: '#e0e0e0', zIndex: 0 }}></div>
      
      {/* Línea de progreso activa */}
      <div className="position-absolute top-50 start-0 translate-middle-y transition-all" 
           style={{ 
             height: '2px', 
             backgroundColor: '#8E7CC3', 
             zIndex: 0, 
             width: `${((pasoActual - 1) / (pasos.length - 1)) * 100}%`,
             transition: 'width 0.4s ease'
           }}></div>  

      {pasos.map((p, index) => (
        <div key={p} className="position-relative d-flex flex-column align-items-center" style={{ zIndex: 1 }}>
          <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm transition-all`}
               style={{
                 width: '40px',
                 height: '40px',
                 backgroundColor: p <= pasoActual ? '#8E7CC3' : '#fff',
                 color: p <= pasoActual ? '#fff' : '#8E7CC3',
                 border: `2px solid #8E7CC3`,
                 fontWeight: 'bold'
               }}>
            {p < pasoActual ? '✓' : p}
          </div>
          <span className="position-absolute top-100 mt-2 small fw-bold text-muted text-nowrap">
            {nombres[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;