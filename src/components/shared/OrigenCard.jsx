import { useForm } from "context/FormContext";
import { useState } from "react";
import { ciudadesOrigen } from "data/ciudadesOrigen";
import { listaFechas } from "data/fechasRecojo";
import { useGoogleMaps } from "hooks/useGoogleMaps";
import Mapa from "../shared/Mapa";
import "./c_origen.css";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import CustomInput from "../ui/CustomInput/CustomInput";
import SelectorModalidad from "../ui/SelectorModalidad/SelectorModalidad";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";

const OrigenCard = (props) => {
  const { formData, actualizarDatos } = useForm();
  const mapsLoaded = useGoogleMaps();
  const seccion = props.title.toLowerCase();

  const [tipoOrigen, setTipoOrigen] = useState(
    formData[seccion].tipo || props.modalidad,
  );
  const [resetKey, setResetKey] = useState(0);
  const [direccionMapa, setDireccionMapa] = useState(
    formData[seccion].direccion || formData[seccion].ciudad || "",
  );

  const opciones = [
    { label: props.modalidadText, value: props.modalidad },
    { label: props.agenciaText, value: "agencia" + props.modalidad },
  ];

  const cambiarTipoOrigen = (nuevoTipo) => {
    setTipoOrigen(nuevoTipo);
    actualizarDatos(seccion, { tipo: nuevoTipo });
    setDireccionMapa("");
    setResetKey((k) => k + 1);
  };

  const manejarCambioCiudad = (e) => {
    const ciudad = e.target.value;
    tipoOrigen !== props.modalidad && setDireccionMapa(ciudad);
    actualizarDatos(seccion, { ciudad: ciudad });
  };

  const manejarCambioDireccion = (e) => {
    const nuevaDireccion = e.target.value;
    setDireccionMapa(nuevaDireccion);
    actualizarDatos(seccion, { direccion: nuevaDireccion });
  };

  if (!mapsLoaded) return <p>Cargando mapa...</p>;

  return (
    <NeumorphicContainer width="100%" maxWidth="100%" className="mx-auto my-2 p-3 p-md-4">
      <h2 className="text-center mb-4 fw-bold text-uppercase fs-4">{props.title}</h2>

      {/* Selector de Modalidad (Agencia/Domicilio) */}
      <div className="mb-4">
        <SelectorModalidad 
          opciones={opciones}
          valorSeleccionado={tipoOrigen}
          onChange={(nuevoValor) => cambiarTipoOrigen(nuevoValor)}
        />
      </div>

      {/* Contenedor de Formulario */}
      <div className="d-flex flex-column align-items-center w-100 gap-2 mb-4">
        
        {tipoOrigen !== props.modalidad && (
          <div className="w-100">
            <CustomSelect
              placeholder="Selecciona una ciudad"
              value={formData[seccion].ciudad || ""}
              options={ciudadesOrigen}
              onChange={manejarCambioCiudad}
            />
          </div>
        )}

        {tipoOrigen === props.modalidad && (
          <>
          <div className="w-100">
              <CustomInput
                type="text"
                placeholder="Departamento"
                value={formData[seccion].departamento || ""}
                onChange={(e) => actualizarDatos(seccion, { departamento: e.target.value })}
              />
            </div>
            <div className="w-100">
              <CustomInput
                type="text"
                placeholder="Provincia"
                value={formData[seccion].provincia || ""}
                onChange={(e) => actualizarDatos(seccion, { provincia: e.target.value })}
              />
            </div>
            <div className="w-100">
              <CustomInput
                type="text"
                placeholder="Distrito"
                value={formData[seccion].distrito || ""}
                onChange={(e) => actualizarDatos(seccion, { distrito: e.target.value })}
              />
            </div>
            <div className="w-100">
              <CustomInput
                type="text"
                placeholder="Dirección exacta"
                value={formData[seccion].direccion || ""}
                onChange={manejarCambioDireccion}
              />
            </div>
            <div className="w-100">
              <CustomInput
                type="text"
                placeholder="Referencia (Ej: Portón azul)"
                value={formData[seccion].referencia || ""}
                onChange={(e) => actualizarDatos(seccion, { referencia: e.target.value })}
              />
            </div>
          </>
        )}

        {tipoOrigen === "recojo" && (
          <div className="w-100">
            <CustomSelect
              placeholder="Fecha de Recojo"
              value={formData[seccion].fecha || ""}
              options={listaFechas}
              onChange={(e) => actualizarDatos(seccion, { fecha: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Contenedor del Mapa */}
<div className="w-100 mt-auto"> 
  <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
    <Mapa direccion={direccionMapa} resetKey={resetKey} />
  </div>
</div>
    </NeumorphicContainer>
  );
};

export default OrigenCard;
