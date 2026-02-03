import { createContext, useContext, useState } from "react";

const ReclamoContext = createContext();

export const ReclamoProvider = ({ children }) => {
  const [paso, setPaso] = useState(1);
  const [archivosEvidencia, setArchivosEvidencia] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [datosReclamo, setDatosReclamo] = useState({
    // Paso 1: Datos del Cliente
    nombreCompleto: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    email: "",
    telefono: "",
    
    // Paso 2: Información del Servicio
    numeroGuia: "",
    fechaServicio: "",
    tipoServicio: "",
    tipoServicioId: "",
    oficina: "",
    oficinaId: "",
    
    // Paso 3: Detalle de la Reclamación
    motivoReclamo: "",
    descripcionDetallada: "",
    montoReclamado: "",
    
    // Paso 4: Evidencias y Finalización
    aceptaPoliticas: false,
    firmaDigital: "",
  });

  const actualizarDatos = (campo, valor) => {
    setDatosReclamo((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const actualizarMultiplesDatos = (datos) => {
    setDatosReclamo((prev) => ({
      ...prev,
      ...datos,
    }));
  };

  const siguientePaso = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPaso((prev) => Math.min(prev + 1, 5));
    // Desbloquear después de la transición (ajusta el tiempo según tu animación)
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const anteriorPaso = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPaso((prev) => Math.max(prev - 1, 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const irAPaso = (numeroPaso) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPaso(numeroPaso);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const resetearFormulario = () => {
    setDatosReclamo({
      nombreCompleto: "",
      tipoDocumento: "DNI",
      numeroDocumento: "",
      email: "",
      telefono: "",
      numeroGuia: "",
      fechaServicio: "",
      tipoServicio: "",
      oficina: "",
      motivoReclamo: "",
      descripcionDetallada: "",
      montoReclamado: "",
      aceptaPoliticas: false,
      firmaDigital: "",
    });
    setArchivosEvidencia([]);
    setPaso(1);
    setIsTransitioning(false); // Reset del lock también
  };

  const agregarArchivo = (archivo) => {
    setArchivosEvidencia((prev) => [...prev, archivo]);
  };

  const agregarArchivos = (archivos) => {
    setArchivosEvidencia((prev) => [...prev, ...archivos]);
  };

  const eliminarArchivo = (index) => {
    setArchivosEvidencia((prev) => prev.filter((_, i) => i !== index));
  };

  const value = {
    paso,
    datosReclamo,
    archivosEvidencia,
    isTransitioning, // Exponemos el estado por si necesitas usarlo en los componentes
    actualizarDatos,
    actualizarMultiplesDatos,
    siguientePaso,
    anteriorPaso,
    irAPaso,
    resetearFormulario,
    agregarArchivo,
    agregarArchivos,
    eliminarArchivo,
  };

  return (
    <ReclamoContext.Provider value={value}>
      {children}
    </ReclamoContext.Provider>
  );
};

export const useReclamo = () => {
  const context = useContext(ReclamoContext);
  if (!context) {
    throw new Error("useReclamo debe ser usado dentro de ReclamoProvider");
  }
  return context;
};