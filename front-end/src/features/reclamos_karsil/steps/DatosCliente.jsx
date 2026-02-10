import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import CustomInput from "components/ui/CustomInput/CustomInput";
import SelectorModalidad from "components/ui/SelectorModalidad/SelectorModalidad";
import FormCard from "../main_components/FormCard";
import StepHeader from "../main_components/StepHeader";
import FormField from "../main_components/FormField";
import StepNavigation from "../main_components/StepNavigation";

const DatosCliente = () => {
  const { datosReclamo, actualizarDatos, siguientePaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const opcionesTipoDocumento = [
    { nombre: "DNI",       value: "DNI",       icon: `/public/icons/icon_caja.png` },
    { nombre: "RUC",       value: "RUC",       icon: `/public/icons/icon_agencia.png` },
    { nombre: "Pasaporte", value: "Pasaporte", icon: `/public/icons/icon_avion.png` },
  ];

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);
    try {
      const { nombreCompleto, numeroDocumento, email, telefono, tipoDocumento } = datosReclamo;
      if (!nombreCompleto.trim())                          return setError("El nombre completo o razón social es obligatorio.");
      if (nombreCompleto.trim().length < 3)                return setError("El nombre debe tener al menos 3 caracteres.");
      if (!numeroDocumento.trim())                         return setError("El número de documento es obligatorio.");
      if (tipoDocumento === "DNI" && !/^\d{8}$/.test(numeroDocumento))  return setError("El DNI debe tener exactamente 8 dígitos.");
      if (tipoDocumento === "RUC" && !/^\d{11}$/.test(numeroDocumento)) return setError("El RUC debe tener exactamente 11 dígitos.");
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))         return setError("Debes ingresar un correo electrónico válido.");
      if (!telefono || telefono.length < 7)                return setError("Debes ingresar un teléfono válido (mínimo 7 dígitos).");
      setError("");
      siguientePaso();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al validar los datos.");
    } finally {
      setIsLocked(false);
    }
  };

  const handleChange = (campo, valor) => {
    actualizarDatos(campo, valor);
    setError("");
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <FormCard>
        <StepHeader
          icon="👤"
          title="Datos del Cliente"
          description="Proporciona tus datos de contacto para procesar tu reclamo"
        />

        <div className="space-y-5">
          {/* Nombre completo */}
          <FormField label="Nombre Completo o Razón Social" required>
            <CustomInput
              name="nombreCompleto"
              type="text"
              placeholder="Ingresa tu nombre completo o razón social"
              value={datosReclamo.nombreCompleto}
              onChange={(e) => handleChange("nombreCompleto", e.target.value)}
            />
          </FormField>

          {/* Tipo de documento */}
          <FormField label="Tipo de Documento" required>
            <SelectorModalidad
              opciones={opcionesTipoDocumento}
              valorSeleccionado={datosReclamo.tipoDocumento}
              onChange={(valor) => handleChange("tipoDocumento", valor)}
            />
          </FormField>

          {/* Número de documento */}
          <FormField
            label={`Número de ${datosReclamo.tipoDocumento}`}
            required
            hint={
              datosReclamo.tipoDocumento === "DNI" ? "8 dígitos numéricos" :
              datosReclamo.tipoDocumento === "RUC" ? "11 dígitos numéricos" :
              "Número de pasaporte"
            }
          >
            <CustomInput
              name="numeroDocumento"
              type="text"
              placeholder={
                datosReclamo.tipoDocumento === "DNI" ? "12345678" :
                datosReclamo.tipoDocumento === "RUC" ? "12345678901" :
                "Número de pasaporte"
              }
              value={datosReclamo.numeroDocumento}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, "");
                handleChange("numeroDocumento", valor);
              }}
              maxLength={
                datosReclamo.tipoDocumento === "DNI" ? 8 :
                datosReclamo.tipoDocumento === "RUC" ? 11 : 20
              }
            />
          </FormField>

          {/* Email y Teléfono en grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Correo Electrónico" required>
              <CustomInput
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={datosReclamo.email}
                onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
              />
            </FormField>

            <FormField label="Teléfono de Contacto" required hint="Mínimo 7 dígitos">
              <CustomInput
                name="telefono"
                type="tel"
                placeholder="999 999 999"
                value={datosReclamo.telefono}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, "");
                  handleChange("telefono", valor);
                }}
                maxLength={15}
              />
            </FormField>
          </div>

          {/* Nota campos obligatorios */}
          <p className="text-xs text-gray-400 text-right">* Campos obligatorios</p>

          <StepNavigation
            onSiguiente={validarYContinuar}
            deshabilitarVolver={true}
            deshabilitarSiguiente={isLocked}
          />
        </div>
      </FormCard>
    </div>
  );
};

export default DatosCliente;