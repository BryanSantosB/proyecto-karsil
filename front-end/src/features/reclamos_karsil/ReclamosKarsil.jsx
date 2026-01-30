import { useState } from "react";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import CustomInput from "components/ui/CustomInput/CustomInput";
import CustomSelect from "components/ui/CustomSelect/CustomSelect";
import SelectorModalidad from "components/ui/SelectorModalidad/SelectorModalidad";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import { api } from "services/api";
import "./Reclamos.css";
import React from "react";


const ReclamosKarsil = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [archivosEvidencia, setArchivosEvidencia] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  
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
    oficina: "",
    
    // Paso 3: Detalle de la Reclamación
    motivoReclamo: "",
    descripcionDetallada: "",
    montoReclamado: "",
    
    // Paso 4: Evidencias y Finalización
    aceptaPoliticas: false,
    firmaDigital: "",
  });

  const opcionesTipoDocumento = [
    {
      label: "DNI",
      value: "DNI",
      icon: `${process.env.REACT_APP_API_UR}/public/icons/icon_caja.png`,
    },
    {
      label: "RUC",
      value: "RUC",
      icon: `${process.env.REACT_APP_API_UR}/public/icons/icon_agencia.png`,
    },
    {
      label: "Pasaporte",
      value: "Pasaporte",
      icon: `${process.env.REACT_APP_API_UR}/public/icons/icon_avion.png`,
    },
  ];

  const tiposServicio = [
    { value: "", label: "Selecciona un tipo de servicio" },
    { value: "carga_pesada", label: "Carga Pesada" },
    { value: "courier", label: "Courier" },
    { value: "local", label: "Envío Local" },
    { value: "nacional", label: "Envío Nacional" },
    { value: "internacional", label: "Envío Internacional" },
  ];

  const motivosReclamo = [
    { value: "", label: "Selecciona un motivo" },
    { value: "demora_entrega", label: "Demora en la entrega" },
    { value: "producto_danado", label: "Producto dañado" },
    { value: "producto_perdido", label: "Producto perdido o extraviado" },
    { value: "maltrato_personal", label: "Maltrato o mala atención del personal" },
    { value: "error_facturacion", label: "Error en facturación o cobro" },
    { value: "servicio_incompleto", label: "Servicio incompleto" },
    { value: "falta_informacion", label: "Falta de información" },
    { value: "otro", label: "Otro motivo" },
  ];

  const oficinas = [
    { value: "", label: "Selecciona una oficina" },
    { value: "lima_centro", label: "Lima Centro - Av. Abancay 123" },
    { value: "callao", label: "Callao - Av. Colonial 456" },
    { value: "san_isidro", label: "San Isidro - Av. Javier Prado 789" },
    { value: "miraflores", label: "Miraflores - Av. Larco 321" },
    { value: "arequipa", label: "Arequipa - Calle Mercaderes 654" },
    { value: "cusco", label: "Cusco - Av. La Cultura 987" },
    { value: "trujillo", label: "Trujillo - Av. España 147" },
    { value: "piura", label: "Piura - Av. Grau 258" },
    { value: "chiclayo", label: "Chiclayo - Av. Balta 369" },
  ];

  const handleChange = (campo, valor) => {
    setDatosReclamo((prev) => ({
      ...prev,
      [campo]: valor,
    }));
    setError(""); // Limpiar errores al escribir
  };

  const handleFileChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const archivosValidos = nuevosArchivos.filter(archivo => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (archivo.size > maxSize) {
        setError(`El archivo ${archivo.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });
    setArchivosEvidencia((prev) => [...prev, ...archivosValidos]);
  };

  const eliminarArchivo = (index) => {
    setArchivosEvidencia((prev) => prev.filter((_, i) => i !== index));
  };

  const validarPaso1 = () => {
    const { nombreCompleto, numeroDocumento, email, telefono } = datosReclamo;
    
    if (!nombreCompleto.trim()) {
      setError("El nombre completo o razón social es obligatorio.");
      return false;
    }

    if (nombreCompleto.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    
    if (!numeroDocumento.trim()) {
      setError("El número de documento es obligatorio.");
      return false;
    }
    
    if (datosReclamo.tipoDocumento === "DNI" && !/^\d{8}$/.test(numeroDocumento)) {
      setError("El DNI debe tener exactamente 8 dígitos.");
      return false;
    }
    
    if (datosReclamo.tipoDocumento === "RUC" && !/^\d{11}$/.test(numeroDocumento)) {
      setError("El RUC debe tener exactamente 11 dígitos.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Debes ingresar un correo electrónico válido.");
      return false;
    }
    
    if (!telefono || telefono.length < 7) {
      setError("Debes ingresar un teléfono válido (mínimo 7 dígitos).");
      return false;
    }
    
    return true;
  };

  const validarPaso2 = () => {
    const { numeroGuia, fechaServicio, tipoServicio, oficina } = datosReclamo;
    
    if (!numeroGuia.trim()) {
      setError("El número de guía o tracking es obligatorio para rastrear tu envío.");
      return false;
    }

    if (numeroGuia.trim().length < 5) {
      setError("El número de guía debe tener al menos 5 caracteres.");
      return false;
    }
    
    if (!fechaServicio) {
      setError("Debes seleccionar la fecha en que se realizó el servicio.");
      return false;
    }

    // Validar que la fecha no sea futura
    const fechaSeleccionada = new Date(fechaServicio);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaSeleccionada > hoy) {
      setError("La fecha del servicio no puede ser futura.");
      return false;
    }
    
    if (!tipoServicio) {
      setError("Debes seleccionar el tipo de servicio contratado.");
      return false;
    }
    
    if (!oficina) {
      setError("Debes seleccionar la oficina donde se realizó el servicio.");
      return false;
    }
    
    return true;
  };

  const validarPaso3 = () => {
    const { motivoReclamo, descripcionDetallada } = datosReclamo;
    
    if (!motivoReclamo) {
      setError("Debes seleccionar el motivo principal de tu reclamo.");
      return false;
    }
    
    if (!descripcionDetallada.trim()) {
      setError("La descripción del reclamo es obligatoria.");
      return false;
    }

    if (descripcionDetallada.trim().length < 20) {
      setError("La descripción debe tener al menos 20 caracteres para ser procesada correctamente.");
      return false;
    }

    if (descripcionDetallada.trim().length > 1000) {
      setError("La descripción no puede exceder los 1000 caracteres.");
      return false;
    }
    
    return true;
  };

  const validarPaso4 = () => {
    const { aceptaPoliticas, firmaDigital } = datosReclamo;
    
    if (archivosEvidencia.length === 0) {
      setError("Debes subir al menos un archivo como evidencia de tu reclamo (foto de guía, producto dañado, etc.).");
      return false;
    }

    if (archivosEvidencia.length > 10) {
      setError("No puedes subir más de 10 archivos como evidencia.");
      return false;
    }
    
    if (!firmaDigital.trim()) {
      setError("Debes ingresar tu firma digital (tu nombre completo).");
      return false;
    }

    if (firmaDigital.trim().length < 5) {
      setError("La firma debe tener al menos 5 caracteres.");
      return false;
    }
    
    if (!aceptaPoliticas) {
      setError("Debes aceptar las políticas de privacidad para continuar.");
      return false;
    }
    
    return true;
  };

  const siguientePaso = () => {
    if (isLocked) return;
    setIsLocked(true);
    
    let esValido = false;
    
    try {
      switch (pasoActual) {
        case 1:
          esValido = validarPaso1();
          break;
        case 2:
          esValido = validarPaso2();
          break;
        case 3:
          esValido = validarPaso3();
          break;
        case 4:
          esValido = validarPaso4();
          if (esValido) {
            setMostrarResumen(true);
            return; // No avanzar, mostrar resumen
          }
          break;
        default:
          esValido = true;
      }
      
      if (esValido) {
        setError("");
        setPasoActual((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al validar los datos. Por favor, intenta nuevamente.");
    } finally {
      setIsLocked(false);
    }
  };

  const anteriorPaso = () => {
    if (pasoActual > 1) {
      setPasoActual((prev) => prev - 1);
      setError("");
      setMostrarResumen(false);
    }
  };

  const enviarReclamo = async () => {
    setIsLocked(true);
    try {
      const formData = new FormData();
      
      // Agregar datos del reclamo
      Object.keys(datosReclamo).forEach((key) => {
        formData.append(key, datosReclamo[key]);
      });
      
      // Agregar archivos
      archivosEvidencia.forEach((archivo, index) => {
        formData.append(`evidencia_${index}`, archivo);
      });
      
      const response = await api.post("/reclamos/crear", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        setExito(
          `¡Reclamo enviado exitosamente! 
          
Número de reclamo: ${response.data.numeroReclamo}

Recibirás un correo electrónico a ${datosReclamo.email} con el cargo de recepción y las instrucciones de seguimiento.

Nuestro equipo se pondrá en contacto contigo en un plazo máximo de 48 horas hábiles.`
        );
        
        // Reiniciar formulario después de 5 segundos
        setTimeout(() => {
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
          setPasoActual(1);
          setMostrarResumen(false);
          setExito("");
        }, 8000);
      }
    } catch (error) {
      console.error("Error al enviar reclamo:", error);
      setError(
        error.response?.data?.mensaje || 
        "Hubo un error al enviar el reclamo. Por favor, verifica tu conexión e intenta nuevamente."
      );
    } finally {
      setIsLocked(false);
    }
  };

  const renderPaso = () => {
    if (mostrarResumen) {
      return <ResumenReclamo datos={datosReclamo} archivos={archivosEvidencia} />;
    }

    switch (pasoActual) {
      case 1:
        return <Paso1 datos={datosReclamo} onChange={handleChange} opciones={opcionesTipoDocumento} />;
      case 2:
        return <Paso2 datos={datosReclamo} onChange={handleChange} tiposServicio={tiposServicio} oficinas={oficinas} />;
      case 3:
        return <Paso3 datos={datosReclamo} onChange={handleChange} motivosReclamo={motivosReclamo} />;
      case 4:
        return (
          <Paso4
            datos={datosReclamo}
            onChange={handleChange}
            archivos={archivosEvidencia}
            onFileChange={handleFileChange}
            onEliminarArchivo={eliminarArchivo}
          />
        );
      default:
        return null;
    }
  };

  const obtenerTextoBoton = () => {
    if (mostrarResumen) return "Confirmar y Enviar";
    if (pasoActual === 4) return "Revisar Reclamo";
    return "Siguiente";
  };

  return (
    <div className="w-full px-2 flex justify-center py-8 reclamos-container">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} tipo="error" />
      {exito && (
        <AlertaFlotante mensaje={exito} onClose={() => setExito("")} tipo="success" />
      )}

      <NeumorphicContainer
        width="100%"
        maxWidth="950px"
        className="p-3 p-md-5 mt-3"
      >
        {/* Header */}
        <div className="text-center mb-5">
          <div className="karsil-logo mb-3">
            <h1 className="text-uppercase fw-bold fs-2 mb-1" style={{ color: "#1a237e", letterSpacing: "2px" }}>
              Karsil Cargo
            </h1>
            <div style={{ height: "3px", width: "80px", background: "linear-gradient(90deg, #1a237e, #5c6bc0)", margin: "0 auto" }}></div>
          </div>
          <h2 className="text-uppercase fw-bold fs-4 mb-2" style={{ color: "#5c6bc0" }}>
            Libro de Reclamaciones
          </h2>
          <p className="text-muted small mb-4">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor
          </p>
          
          {/* Indicador de pasos */}
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            {[
              { num: 1, titulo: "Cliente" },
              { num: 2, titulo: "Servicio" },
              { num: 3, titulo: "Reclamo" },
              { num: 4, titulo: "Evidencias" },
            ].map((paso, index) => (
              <React.Fragment key={paso.num}>
                <div className="text-center">
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto ${
                      paso.num === pasoActual
                        ? "bg-primary text-white"
                        : paso.num < pasoActual
                        ? "bg-success text-white"
                        : "bg-light text-muted"
                    }`}
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      boxShadow: paso.num === pasoActual ? "0 4px 12px rgba(0,123,255,0.3)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {paso.num < pasoActual ? "✓" : paso.num}
                  </div>
                  <p className="text-muted small mt-2 mb-0" style={{ fontSize: "11px" }}>
                    {paso.titulo}
                  </p>
                </div>
                {index < 3 && (
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      background: paso.num < pasoActual ? "#28a745" : "#e0e0e0",
                      marginTop: "-20px",
                    }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-primary fw-bold mt-3 mb-0">
            {mostrarResumen ? "Revisión Final" : `Paso ${pasoActual} de 4`}
          </p>
        </div>

        {/* Contenido del paso actual */}
        <div className="row mx-0 g-3">
          {renderPaso()}

          {/* Navegación */}
          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={mostrarResumen ? enviarReclamo : siguientePaso}
              onVolver={anteriorPaso}
              textoSiguiente={obtenerTextoBoton()}
              deshabilitarVolver={pasoActual === 1 && !mostrarResumen}
              deshabilitarSiguiente={isLocked}
            />
          </div>
        </div>

        {/* Footer informativo */}
        <div className="text-center mt-4 pt-3" style={{ borderTop: "1px solid #e0e0e0" }}>
          <p className="text-muted small mb-1">
            <strong>¿Necesitas ayuda?</strong> Comunícate con nosotros
          </p>
          <p className="text-muted small mb-0">
            📞 Central telefónica: (01) 555-5555 | 📧 reclamos@karsilcargo.com.pe
          </p>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

// Componente Paso 1: Datos del Cliente
const Paso1 = ({ datos, onChange, opciones }) => {
  return (
    <>
      <div className="col-12 mb-3">
        <div className="alert alert-info" style={{ borderRadius: "12px", background: "#e3f2fd", border: "none" }}>
          <small>
            <strong>📋 Paso 1:</strong> Proporciona tus datos de contacto para que podamos procesar tu reclamo
          </small>
        </div>
      </div>

      <div className="col-12 px-1">
        <CustomInput
          label="Nombre Completo o Razón Social *"
          name="nombreCompleto"
          type="text"
          placeholder="Ingresa tu nombre completo o razón social"
          value={datos.nombreCompleto}
          onChange={(e) => onChange("nombreCompleto", e.target.value)}
        />
      </div>

      <div className="col-12 mt-3">
        <label className="d-block text-center mb-3 fw-bold text-muted small">
          TIPO DE DOCUMENTO *
        </label>
        <SelectorModalidad
          opciones={opciones}
          valorSeleccionado={datos.tipoDocumento}
          onChange={(valor) => onChange("tipoDocumento", valor)}
        />
      </div>

      <div className="col-12 px-1">
        <CustomInput
          label={`Número de ${datos.tipoDocumento} *`}
          name="numeroDocumento"
          type="text"
          placeholder={
            datos.tipoDocumento === "DNI"
              ? "8 dígitos"
              : datos.tipoDocumento === "RUC"
              ? "11 dígitos"
              : "Número de pasaporte"
          }
          value={datos.numeroDocumento}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, ""); // Solo números
            onChange("numeroDocumento", valor);
          }}
          maxLength={datos.tipoDocumento === "DNI" ? 8 : datos.tipoDocumento === "RUC" ? 11 : 20}
        />
      </div>

      <div className="col-12 col-md-6 px-1">
        <CustomInput
          label="Correo Electrónico *"
          name="email"
          type="email"
          placeholder="ejemplo@correo.com"
          value={datos.email}
          onChange={(e) => onChange("email", e.target.value.toLowerCase())}
        />
      </div>

      <div className="col-12 col-md-6 px-1">
        <CustomInput
          label="Teléfono de Contacto *"
          name="telefono"
          type="tel"
          placeholder="999 999 999"
          value={datos.telefono}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, ""); // Solo números
            onChange("telefono", valor);
          }}
          maxLength={15}
        />
      </div>

      <div className="col-12 mt-2">
        <small className="text-muted">* Campos obligatorios</small>
      </div>
    </>
  );
};

// Componente Paso 2: Información del Servicio
const Paso2 = ({ datos, onChange, tiposServicio, oficinas }) => {
  return (
    <>
      <div className="col-12 mb-3">
        <div className="alert alert-info" style={{ borderRadius: "12px", background: "#e3f2fd", border: "none" }}>
          <small>
            <strong>📦 Paso 2:</strong> Proporciona los detalles del servicio para rastrear tu envío
          </small>
        </div>
      </div>

      <div className="col-12 col-md-6 px-1">
        <CustomInput
          label="Número de Guía / Tracking *"
          name="numeroGuia"
          type="text"
          placeholder="KC-2024-000000"
          value={datos.numeroGuia}
          onChange={(e) => onChange("numeroGuia", e.target.value.toUpperCase())}
        />
        <small className="text-muted">Puedes encontrarlo en tu comprobante de envío</small>
      </div>

      <div className="col-12 col-md-6 px-1">
        <CustomInput
          label="Fecha del Servicio *"
          name="fechaServicio"
          type="date"
          value={datos.fechaServicio}
          onChange={(e) => onChange("fechaServicio", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="col-12 col-md-6 px-1">
        <label className="fw-bold text-muted small mb-2">Tipo de Servicio *</label>
        <CustomSelect
          placeholder="Tipo de Servicio"
          value={datos.tipoServicio}
          options={tiposServicio}
          onChange={(e) => onChange("tipoServicio", e.target.value)}
        />
      </div>

      <div className="col-12 col-md-6 px-1">
        <label className="fw-bold text-muted small mb-2">Oficina de Atención *</label>
        <CustomSelect
          placeholder="Oficina"
          value={datos.oficina}
          options={oficinas}
          onChange={(e) => onChange("oficina", e.target.value)}
        />
      </div>

      <div className="col-12 mt-2">
        <small className="text-muted">* Campos obligatorios</small>
      </div>
    </>
  );
};

// Componente Paso 3: Detalle de la Reclamación
const Paso3 = ({ datos, onChange, motivosReclamo }) => {
  const caracteresRestantes = 1000 - datos.descripcionDetallada.length;
  
  return (
    <>
      <div className="col-12 mb-3">
        <div className="alert alert-info" style={{ borderRadius: "12px", background: "#e3f2fd", border: "none" }}>
          <small>
            <strong>📝 Paso 3:</strong> Describe detalladamente tu reclamo para que podamos atenderlo adecuadamente
          </small>
        </div>
      </div>

      <div className="col-12 px-1">
        <label className="fw-bold text-muted small mb-2">Motivo del Reclamo *</label>
        <CustomSelect
          placeholder="Motivo del Reclamo"
          value={datos.motivoReclamo}
          options={motivosReclamo}
          onChange={(e) => onChange("motivoReclamo", e.target.value)}
        />
      </div>

      <div className="col-12 px-1 mt-3">
        <label className="fw-bold text-muted small mb-2">
          Descripción Detallada del Hecho *
        </label>
        <textarea
          className="form-control"
          rows="7"
          placeholder="Describe detalladamente lo sucedido. Incluye:
• Qué ocurrió exactamente
• Cuándo sucedió
• Dónde ocurrió
• Personas involucradas (si aplica)
• Cualquier detalle relevante que nos ayude a resolver tu caso"
          value={datos.descripcionDetallada}
          onChange={(e) => onChange("descripcionDetallada", e.target.value)}
          maxLength={1000}
          style={{
            borderRadius: "12px",
            border: "2px solid #e0e0e0",
            padding: "15px",
            fontSize: "14px",
            resize: "vertical",
          }}
        />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className={datos.descripcionDetallada.length < 20 ? "text-danger" : "text-success"}>
            {datos.descripcionDetallada.length < 20 
              ? `Mínimo 20 caracteres (${datos.descripcionDetallada.length}/20)`
              : "✓ Descripción válida"
            }
          </small>
          <small className={caracteresRestantes < 100 ? "text-warning" : "text-muted"}>
            {caracteresRestantes} caracteres restantes
          </small>
        </div>
      </div>

      <div className="col-12 col-md-6 px-1 mt-3">
        <CustomInput
          label="Monto Reclamado (Opcional)"
          name="montoReclamado"
          type="number"
          placeholder="0.00"
          value={datos.montoReclamado}
          onChange={(e) => onChange("montoReclamado", e.target.value)}
          step="0.01"
          min="0"
        />
        <small className="text-muted">Solo si solicitas compensación económica</small>
      </div>

      <div className="col-12 mt-2">
        <small className="text-muted">* Campos obligatorios</small>
      </div>
    </>
  );
};

// Componente Paso 4: Evidencias y Finalización
const Paso4 = ({ datos, onChange, archivos, onFileChange, onEliminarArchivo }) => {
  const calcularTamañoTotal = () => {
    const totalBytes = archivos.reduce((acc, archivo) => acc + archivo.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2); // Convertir a MB
  };

  return (
    <>
      <div className="col-12 mb-3">
        <div className="alert alert-info" style={{ borderRadius: "12px", background: "#e3f2fd", border: "none" }}>
          <small>
            <strong>📎 Paso 4:</strong> Adjunta evidencias y firma tu reclamo para finalizarlo
          </small>
        </div>
      </div>

      <div className="col-12 px-1">
        <label className="fw-bold text-muted small mb-2">
          Cargar Evidencias * (Fotos, Documentos, Capturas)
        </label>
        <div
          className="border rounded p-4 text-center"
          style={{
            borderRadius: "12px",
            border: "2px dashed #007bff",
            background: "#f8f9fa",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" style={{ cursor: "pointer", width: "100%" }}>
            <div className="mb-2">
              <i className="bi bi-cloud-upload" style={{ fontSize: "48px", color: "#007bff" }}></i>
            </div>
            <p className="mb-1 fw-bold">Haz clic aquí para seleccionar archivos</p>
            <small className="text-muted">
              o arrastra y suelta tus archivos
            </small>
          </label>
        </div>
        <small className="text-muted d-block mt-2">
          Formatos aceptados: JPG, PNG, PDF, DOC, DOCX | Tamaño máximo por archivo: 5MB
        </small>
      </div>

      {archivos.length > 0 && (
        <div className="col-12 px-1 mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fw-bold text-muted small mb-0">
              Archivos cargados ({archivos.length}) - Total: {calcularTamañoTotal()} MB
            </p>
          </div>
          <div className="list-group">
            {archivos.map((archivo, index) => (
              <div
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ borderRadius: "8px", marginBottom: "8px", padding: "12px" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark" style={{ fontSize: "24px", color: "#6c757d" }}></i>
                  <div>
                    <span className="small fw-bold">{archivo.name}</span>
                    <br />
                    <small className="text-muted">
                      {(archivo.size / 1024).toFixed(2)} KB
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminarArchivo(index)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="col-12 px-1 mt-4">
        <CustomInput
          label="Firma Digital (Nombre Completo) *"
          name="firmaDigital"
          type="text"
          placeholder="Escribe tu nombre completo como firma"
          value={datos.firmaDigital}
          onChange={(e) => onChange("firmaDigital", e.target.value)}
        />
        <small className="text-muted">
          Al firmar, certificas que la información proporcionada es verídica
        </small>
      </div>

      <div className="col-12 px-1 mt-4">
        <div
          className="p-3 rounded"
          style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "12px" }}
        >
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="aceptaPoliticas"
              checked={datos.aceptaPoliticas}
              onChange={(e) => onChange("aceptaPoliticas", e.target.checked)}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
            <label
              className="form-check-label small"
              htmlFor="aceptaPoliticas"
              style={{ cursor: "pointer", paddingLeft: "10px" }}
            >
              <strong>Acepto las Políticas de Privacidad *</strong>
              <br />
              Autorizo a Karsil Cargo al tratamiento de mis datos personales conforme a la{" "}
              <a href="/politicas-privacidad" target="_blank" rel="noopener noreferrer">
                Ley N° 29733 - Ley de Protección de Datos Personales
              </a>
              {" "}y su Reglamento, exclusivamente para el procesamiento de este reclamo.
            </label>
          </div>
        </div>
      </div>

      <div className="col-12 px-1 mt-3">
        <div
          className="alert alert-warning"
          style={{ borderRadius: "12px", background: "#fff3cd", border: "1px solid #ffc107" }}
          role="alert"
        >
          <strong>⚠️ Importante:</strong>
          <ul className="mb-0 mt-2 small">
            <li>Una vez enviado, recibirás un correo con el cargo de recepción</li>
            <li>Se te asignará un número de seguimiento único</li>
            <li>Nuestro equipo responderá en un plazo máximo de 48 horas hábiles</li>
            <li>Conserva tu número de reclamo para consultas futuras</li>
          </ul>
        </div>
      </div>

      <div className="col-12 mt-2">
        <small className="text-muted">* Campos obligatorios</small>
      </div>
    </>
  );
};

// Componente Resumen Final
const ResumenReclamo = ({ datos, archivos }) => {
  const motivosMap = {
    demora_entrega: "Demora en la entrega",
    producto_danado: "Producto dañado",
    producto_perdido: "Producto perdido o extraviado",
    maltrato_personal: "Maltrato o mala atención del personal",
    error_facturacion: "Error en facturación o cobro",
    servicio_incompleto: "Servicio incompleto",
    falta_informacion: "Falta de información",
    otro: "Otro motivo",
  };

  return (
    <div className="col-12">
      <div className="alert alert-success mb-4" style={{ borderRadius: "12px" }}>
        <strong>✓ Revisa tu información antes de enviar</strong>
        <p className="mb-0 small mt-1">
          Verifica que todos los datos sean correctos. Una vez enviado, no podrás modificar el reclamo.
        </p>
      </div>

      <div className="row g-3">
        {/* Sección 1: Datos del Cliente */}
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#f8f9fa", borderLeft: "4px solid #007bff" }}>
            <h5 className="fw-bold mb-3">👤 Datos del Cliente</h5>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Nombre:</strong> {datos.nombreCompleto}
                </p>
                <p className="mb-2">
                  <strong>{datos.tipoDocumento}:</strong> {datos.numeroDocumento}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Email:</strong> {datos.email}
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong> {datos.telefono}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Información del Servicio */}
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#f8f9fa", borderLeft: "4px solid #28a745" }}>
            <h5 className="fw-bold mb-3">📦 Información del Servicio</h5>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>N° Guía:</strong> {datos.numeroGuia}
                </p>
                <p className="mb-2">
                  <strong>Fecha:</strong> {new Date(datos.fechaServicio).toLocaleDateString("es-PE")}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Tipo:</strong> {datos.tipoServicio}
                </p>
                <p className="mb-2">
                  <strong>Oficina:</strong> {datos.oficina}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Detalle del Reclamo */}
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#f8f9fa", borderLeft: "4px solid #ffc107" }}>
            <h5 className="fw-bold mb-3">📝 Detalle del Reclamo</h5>
            <p className="mb-2">
              <strong>Motivo:</strong> {motivosMap[datos.motivoReclamo] || datos.motivoReclamo}
            </p>
            <p className="mb-2">
              <strong>Descripción:</strong>
            </p>
            <p className="small bg-white p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
              {datos.descripcionDetallada}
            </p>
            {datos.montoReclamado && (
              <p className="mb-0">
                <strong>Monto reclamado:</strong> S/ {datos.montoReclamado}
              </p>
            )}
          </div>
        </div>

        {/* Sección 4: Evidencias */}
        <div className="col-12">
          <div className="p-3 rounded" style={{ background: "#f8f9fa", borderLeft: "4px solid #dc3545" }}>
            <h5 className="fw-bold mb-3">📎 Evidencias</h5>
            <p className="mb-2">
              <strong>Archivos adjuntos:</strong> {archivos.length}
            </p>
            <ul className="small mb-2">
              {archivos.map((archivo, index) => (
                <li key={index}>{archivo.name}</li>
              ))}
            </ul>
            <p className="mb-0">
              <strong>Firma:</strong> {datos.firmaDigital}
            </p>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3" style={{ borderRadius: "12px" }}>
        <small>
          <strong>ℹ️ Nota:</strong> Al confirmar, aceptas que la información proporcionada es verídica y
          autorizas el procesamiento de tu reclamo conforme a nuestras políticas de privacidad.
        </small>
      </div>
    </div>
  );
};

export default ReclamosKarsil;