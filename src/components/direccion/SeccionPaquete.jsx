import { useState } from "react";
import { useForm } from "../../context/FormContext";
import AlertaFlotante from "../AlertaFlotante";

const SeccionPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

  const validarYContinuar = () => {
    const { paquete } = formData;

    // 1. Validar Peso
    if (!paquete.peso || paquete.peso <= 0) {
      setError("El peso debe ser una cantidad mayor a 0 kg.");
      return;
    }

    // 2. Validar Dimensiones (Largo, Ancho, Alto)
    if (!paquete.largo || paquete.largo <= 0 || 
        !paquete.ancho || paquete.ancho <= 0 || 
        !paquete.alto  || paquete.alto <= 0) {
      setError("Todas las dimensiones (largo, ancho y alto) deben ser mayores a 0 cm.");
      return;
    }

    // 3. Validar Tipo de Envío (Aéreo o Terrestre)
    if (!paquete.tipoEnvio || paquete.tipoEnvio === "") {
      setError("Debes seleccionar un método de envío (Aéreo o Terrestre).");
      return;
    }

    // Si todo es correcto
    setError("");
    siguientePaso();
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    actualizarDatos('paquete', { [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center">
      {/* Componente de Alerta */}
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />
      <div className="card shadow-sm p-4 w-100 " style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4 text-uppercase fw-bold">Detalles</h2>

        <div className="row g-3">
          {/* Campo Peso */}
          <div className="col-12">
            <label className="form-label small fw-bold text-muted">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              className="form-control form-control-lg bg-light border-0"
              placeholder="0.00"
              value={formData.paquete.peso || ''}
              onChange={handleChange}
            />
          </div>

          {/* Dimensiones: Alto, Ancho, Largo */}
          <div className="col-4">
            <label className="form-label small fw-bold text-muted">Largo (cm)</label>
            <input
              type="number"
              name="largo"
              className="form-control bg-light border-0"
              placeholder="0"
              value={formData.paquete.largo || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <label className="form-label small fw-bold text-muted">Ancho (cm)</label>
            <input
              type="number"
              name="ancho"
              className="form-control bg-light border-0"
              placeholder="0"
              value={formData.paquete.ancho || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <label className="form-label small fw-bold text-muted">Alto (cm)</label>
            <input
              type="number"
              name="alto"
              className="form-control bg-light border-0"
              placeholder="0"
              value={formData.paquete.alto || ''}
              onChange={handleChange}
            />
          </div>

          {/* Opciones de Envío (Aéreo / Terrestre) */}
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-center gap-3">
              <label className="flex-fill">
                <input
                  type="radio"
                  name="tipoEnvio"
                  value="aereo"
                  className="btn-check"
                  checked={formData.paquete.tipoEnvio === 'aereo'}
                  onChange={handleChange}
                />
                <span className="btn btn-outline-primary w-100 py-2 rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: formData.paquete.tipoEnvio === 'aereo' ? '#E0D7FF' : '#F0F0F0', color: '#000' }}>
                  Aereo
                </span>
              </label>

              <label className="flex-fill">
                <input
                  type="radio"
                  name="tipoEnvio"
                  value="terrestre"
                  className="btn-check"
                  checked={formData.paquete.tipoEnvio === 'terrestre'}
                  onChange={handleChange}
                />
                <span className="btn btn-outline-primary w-100 py-2 rounded-pill border-0 shadow-sm"
                      style={{ backgroundColor: formData.paquete.tipoEnvio === 'terrestre' ? '#E0D7FF' : '#F0F0F0', color: '#000' }}>
                  Terrestre
                </span>
              </label>
            </div>
          </div>

          {/* Botón Siguiente */}
          <div className="col-12 mt-5 d-flex flex-column align-items-center gap-2">
            <button
              onClick={validarYContinuar}
              className="btn py-2 px-5 rounded-pill shadow-sm fw-bold"
              style={{ backgroundColor: '#E0D7FF', color: '#000', minWidth: '200px' }}
            >
              Siguiente
            </button>
            <button 
              onClick={anteriorPaso}
              className="btn btn-link btn-sm text-muted text-decoration-none"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionPaquete;