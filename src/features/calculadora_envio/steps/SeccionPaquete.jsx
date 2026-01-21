import { useState } from "react";
import { useForm } from "context/FormContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import CustomInput from "components/ui/CustomInput/CustomInput";
/* import "../../../components/ui/NeumorphicCard.module.css"; */

const SeccionPaquete = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");

  const validarYContinuar = () => {
    const { paquete } = formData;

    if (!paquete.peso || paquete.peso <= 0) {
      setError("El peso debe ser una cantidad mayor a 0 kg.");
      return;
    }

    if (!paquete.largo || paquete.largo <= 0 || 
        !paquete.ancho || paquete.ancho <= 0 || 
        !paquete.alto  || paquete.alto <= 0) {
      setError("Todas las dimensiones (largo, ancho y alto) deben ser mayores a 0 cm.");
      return;
    }

    if (!paquete.tipoEnvio || paquete.tipoEnvio === "") {
      setError("Debes seleccionar un método de envío (Aéreo o Terrestre).");
      return;
    }

    setError("");
    siguientePaso();
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    actualizarDatos('paquete', { [name]: value });
  };

  return (
    <div className=" container d-flex justify-content-center ">
      {/* Componente de Alerta */}
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />
      <div className=" card shadow-lg border-0 p-5 w-100 mt-3" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4 text-uppercase fw-bold">Detalles</h2>

        <div className="row g-3">
          {/* Campo Peso */}
          <CustomInput
            label="Peso (kg)"
            name="peso"
            type="number"
            placeholder="0.00"
            value={formData.paquete.peso || ''}
            onChange={(e) => handleChange(e)}
            min="0.1"
            step="0.1"
          />

          {/* Dimensiones: Alto, Ancho, Largo */}
          <div className="col-4">
            <CustomInput
              label="Largo (cm)"
              name="largo"
              type="number"
              placeholder="0"
              value={formData.paquete.largo || ''}
              onChange={(e) => handleChange(e)}
              min="0.1"
              step="0.1"
            />
          </div>
          <div className="col-4">
            <CustomInput
              label="Ancho (cm)"
              name="ancho"
              type="number"
              placeholder="0"
              value={formData.paquete.ancho || ''}
              onChange={(e) => handleChange(e)}
              min="0.1"
              step="0.1"
            />
          </div>
          <div className="col-4">
            <CustomInput
              label="Alto (cm)"
              name="alto"
              type="number"
              placeholder="0"
              value={formData.paquete.alto || ''}
              onChange={(e) => handleChange(e)}
              min="0.1"
              step="0.1"
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
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionPaquete;