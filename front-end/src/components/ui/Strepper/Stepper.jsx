const Stepper = ({ pasoActual }) => {
  const pasos = [1, 2, 3, 4, 5];
  const nombres = ["Ruta", "Paquete", "Categoría", "Datos", "Cotización"];

  return (
   <div className="d-flex justify-content-center w-100">
    <div className="d-flex justify-content-between position-relative mb-5 w-responsive mx-3">
      {/* Línea de fondo */}
      <div className="position-absolute top-50 start-0 translate-middle-y w-100" 
           style={{ height: '2px', backgroundColor: '#e0e0e0', zIndex: 0 }}></div>
      
      {/* Línea de progreso activa */}
      <div className="position-absolute top-50 start-0 translate-middle-y transition-all" 
           style={{ 
             height: '2px', 
             backgroundColor: 'var(--color-primary)', 
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
                 backgroundColor: p <= pasoActual ? 'var(--color-primary)' : '#fff',
                 color: p <= pasoActual ? '#fff' : 'var(--color-primary)',
                 border: `2px solid var(--color-primary)`,
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
   </div> 
  );
};

export default Stepper;