import { useState } from "react";
import { useForm } from "context/FormContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import CustomInput from "components/ui/CustomInput/CustomInput";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";

const SeccionContacto = () => {
  const { formData, actualizarDatos, siguientePaso, anteriorPaso } = useForm();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    const { contacto } = formData;
    
    // Validación de Teléfono (9 dígitos en Perú)
    const phoneRegex = /^9\d{8}$/;
    if (!contacto.telefono || !phoneRegex.test(contacto.telefono)) {
      setError("Ingresa un número de celular válido (9 dígitos).");
      return;
    }

    // Validación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contacto.email || !emailRegex.test(contacto.email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setError("");
    siguientePaso(); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    actualizarDatos('contacto', { [name]: value });
  };

  return (
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="600px" className="p-4 p-md-5 mt-3">
        <div className="text-center mb-4">
          <h2 className="text-uppercase fw-bold fs-4 fs-md-2 mb-2">Finalizar Pedido</h2>
          <p className="text-muted small">Necesitamos tus datos para enviarte la confirmación.</p>
        </div>

        <div className="row mx-0 g-4">
          {/* Teléfono */}
          <div className="col-12 px-1">
            <CustomInput
              label="Celular de contacto"
              name="telefono"
              type="tel"
              placeholder="Ej: 987 654 321"
              value={formData.contacto?.telefono || ''}
              onChange={handleChange}
            />
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              * Se enviarán actualizaciones por WhatsApp.
            </span>
          </div>

          {/* Correo Electrónico */}
          <div className="col-12 px-1">
            <CustomInput
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="Ej: usuario@gmail.com"
              value={formData.contacto?.email || ''}
              onChange={handleChange}
            />
          </div>

          {/* Aviso de Privacidad resumido */}
          <div className="col-12 px-1 mt-3">
            <div className="p-3 rounded-3 bg-light border-0 shadow-inner" style={{ fontSize: '0.8rem', color: '#666' }}>
              ℹ️ Al continuar, aceptas que **Karsil** te contacte para la coordinación de la entrega de tu paquete.
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
              textoSiguiente="Ver Resumen" // Personalizamos el texto para el paso final
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default SeccionContacto;