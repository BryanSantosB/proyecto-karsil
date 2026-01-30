import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import CustomInput from "components/ui/CustomInput/CustomInput";
import SelectorModalidad from "components/ui/SelectorModalidad/SelectorModalidad";

const DatosCliente = () => {
  const { datosReclamo, actualizarDatos, siguientePaso } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

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

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    try {
      const { nombreCompleto, numeroDocumento, email, telefono, tipoDocumento } = datosReclamo;

      if (!nombreCompleto.trim()) {
        setError("El nombre completo o razón social es obligatorio.");
        return;
      }

      if (nombreCompleto.trim().length < 3) {
        setError("El nombre debe tener al menos 3 caracteres.");
        return;
      }

      if (!numeroDocumento.trim()) {
        setError("El número de documento es obligatorio.");
        return;
      }

      if (tipoDocumento === "DNI" && !/^\d{8}$/.test(numeroDocumento)) {
        setError("El DNI debe tener exactamente 8 dígitos.");
        return;
      }

      if (tipoDocumento === "RUC" && !/^\d{11}$/.test(numeroDocumento)) {
        setError("El RUC debe tener exactamente 11 dígitos.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setError("Debes ingresar un correo electrónico válido.");
        return;
      }

      if (!telefono || telefono.length < 7) {
        setError("Debes ingresar un teléfono válido (mínimo 7 dígitos).");
        return;
      }

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
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        {/* Título del paso */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">👤</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  Datos del Cliente
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Proporciona tus datos de contacto para procesar tu reclamo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 g-3">
          {/* Nombre completo */}
          <div className="col-12 px-1">
            <CustomInput
              label="Nombre Completo o Razón Social *"
              name="nombreCompleto"
              type="text"
              placeholder="Ingresa tu nombre completo o razón social"
              value={datosReclamo.nombreCompleto}
              onChange={(e) => handleChange("nombreCompleto", e.target.value)}
            />
          </div>

          {/* Selector de tipo de documento */}
          <div className="col-12 mt-3">
            <label className="block text-center mb-3 font-bold text-gray-600 text-sm uppercase tracking-wide">
              Tipo de Documento *
            </label>
            <SelectorModalidad
              opciones={opcionesTipoDocumento}
              valorSeleccionado={datosReclamo.tipoDocumento}
              onChange={(valor) => handleChange("tipoDocumento", valor)}
            />
          </div>

          {/* Número de documento */}
          <div className="col-12 px-1">
            <CustomInput
              label={`Número de ${datosReclamo.tipoDocumento} *`}
              name="numeroDocumento"
              type="text"
              placeholder={
                datosReclamo.tipoDocumento === "DNI"
                  ? "8 dígitos"
                  : datosReclamo.tipoDocumento === "RUC"
                  ? "11 dígitos"
                  : "Número de pasaporte"
              }
              value={datosReclamo.numeroDocumento}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, "");
                handleChange("numeroDocumento", valor);
              }}
              maxLength={
                datosReclamo.tipoDocumento === "DNI"
                  ? 8
                  : datosReclamo.tipoDocumento === "RUC"
                  ? 11
                  : 20
              }
            />
          </div>

          {/* Email y Teléfono */}
          <div className="col-12 col-md-6 px-1">
            <CustomInput
              label="Correo Electrónico *"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={datosReclamo.email}
              onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
            />
          </div>

          <div className="col-12 col-md-6 px-1">
            <CustomInput
              label="Teléfono de Contacto *"
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
          </div>

          {/* Nota de campos obligatorios */}
          <div className="col-12 mt-2">
            <p className="text-xs text-gray-500 text-center">
              * Campos obligatorios
            </p>
          </div>

          {/* Navegación */}
          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              deshabilitarVolver={true}
              deshabilitarSiguiente={isLocked}
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default DatosCliente;