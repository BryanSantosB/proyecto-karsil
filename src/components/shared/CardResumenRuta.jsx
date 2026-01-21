const CardResumenRuta = ({ titulo, tipo, datos, colorPrincipal, bgColor }) => {
  const datoValido = (val) => val && val !== "" ? val : <span className="text-muted fst-italic">No especificado</span>;
  
  return (
    <div className="p-3 rounded-4 h-100 shadow-sm" style={{ backgroundColor: bgColor, borderLeft: `5px solid ${colorPrincipal}` }}>
      <p className="badge bg-white text-dark mb-2 shadow-sm">{titulo}: {tipo?.toUpperCase()}</p>
      <p className="mb-1"><strong>Ciudad:</strong> {datoValido(datos.ciudad)}</p>
      <p className="mb-1"><strong>Dirección:</strong> {datoValido(datos.direccion)}</p>
      <p className="mb-1"><strong>Referencia:</strong> {datoValido(datos.referencia)}</p>
      {datos.fecha && <p className="mb-0 mt-2"><strong>Fecha:</strong> {datoValido(datos.fecha)}</p>}
    </div>
  );
};

export default CardResumenRuta;