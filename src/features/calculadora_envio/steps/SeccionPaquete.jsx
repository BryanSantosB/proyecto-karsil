import { useState } from "react";
import { useForm } from "context/FormContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import CustomInput from "components/ui/CustomInput/CustomInput";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";

const SeccionPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

  const validarYContinuar = () => {
    const { paquete } = formData;
    if (!paquete.peso || paquete.peso <= 0) {
      setError("El peso debe ser una cantidad mayor a 0 kg.");
      return;
    }
    if (!paquete.largo || paquete.largo <= 0 || !paquete.ancho || paquete.ancho <= 0 || !paquete.alto || paquete.alto <= 0) {
      setError("Todas las dimensiones deben ser mayores a 0 cm.");
      return;
    }
    if (!paquete.tipoEnvio) {
      setError("Debes seleccionar un método de envío.");
      return;
    }
    setError("");
    siguientePaso();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    actualizarDatos('paquete', { [name]: value });
  };

  return (
    <div className="container-fluid px-2 d-flex justify-content-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        <h2 className="text-center mb-4 text-uppercase fw-bold fs-4 fs-md-2">Detalles</h2>

        <div className="row g-3">
          {/* Peso */}
          <div className="col-12">
            <CustomInput
              label="Peso (kg)"
              name="peso"
              type="number"
              placeholder="0.00"
              value={formData.paquete.peso || ''}
              onChange={handleChange}
            />
          </div>

          {/* Dimensiones */}
          <div className="col-12 col-md-4">
            <CustomInput
              label="Largo (cm)"
              name="largo"
              type="number"
              placeholder="0"
              value={formData.paquete.largo || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <CustomInput
              label="Ancho (cm)"
              name="ancho"
              type="number"
              placeholder="0"
              value={formData.paquete.ancho || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <CustomInput
              label="Alto (cm)"
              name="alto"
              type="number"
              placeholder="0"
              value={formData.paquete.alto || ''}
              onChange={handleChange}
            />
          </div>

          {/* Opciones de Envío*/}
          <div className="col-12 mt-4">
            <label className="d-block text-center mb-3 fw-bold text-muted small">MÉTODO DE ENVÍO</label>
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <label className="flex-fill">
                <input
                  type="radio"
                  name="tipoEnvio"
                  value="aereo"
                  className="btn-check"
                  checked={formData.paquete.tipoEnvio === 'aereo'}
                  onChange={handleChange}
                />
                <span className="btn btn-outline-primary w-100 py-3 rounded-pill border-0 shadow-sm d-flex align-items-center justify-content-center" 
                      style={{ backgroundColor: formData.paquete.tipoEnvio === 'aereo' ? '#E0D7FF' : '#F8F9FA', color: '#000', minHeight: '55px' }}>
                  ✈️ Aéreo
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
                <span className="btn btn-outline-primary w-100 py-3 rounded-pill border-0 shadow-sm d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: formData.paquete.tipoEnvio === 'terrestre' ? '#E0D7FF' : '#F8F9FA', color: '#000', minHeight: '55px' }}>
                  🚚 Terrestre
                </span>
              </label>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="col-12 mt-5">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default SeccionPaquete;