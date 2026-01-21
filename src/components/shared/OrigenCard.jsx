import { useForm } from "../../context/FormContext";
import { useState } from "react";
import { ciudadesOrigen } from "../../data/ciudadesOrigen";
import { listaFechas } from "../../data/fechasRecojo";
import { useGoogleMaps } from "../../hooks/useGoogleMaps";
import Mapa from "../shared/Mapa";
import "./c_origen.css";
import CustomSelect from "../ui/CustomSelect";
import CustomInput from "../ui/CustomInput";
import SelectorModalidad from "../ui/SelectorModalidad";

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
    // Mantenemos tu lógica de validación para el mapa
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
    <div className="card shadow border-0 w-100 mt-3">
      <h2 className="title">{props.title}</h2>

      {/* Radios */}
      <SelectorModalidad 
        opciones={opciones}
        valorSeleccionado={tipoOrigen}
        onChange={(nuevoValor) => cambiarTipoOrigen(nuevoValor)}
      />

      <div className="w-80">
        

      {/* Ciudad */}
      <CustomSelect
        placeholder="Selecciona una ciudad"
        value={formData[seccion].ciudad || ""}
        options={ciudadesOrigen}
        onChange={(e) => manejarCambioCiudad(e)}
      />

      {/* Dirección */}
      {tipoOrigen === props.modalidad && (
        <CustomInput
          type="text"
          placeholder="Dirección"
          value={formData[seccion].direccion || ""}
          onChange={(e) => manejarCambioDireccion(e)}
          min="0.1"
          step="0.1"
        />
      )}

      {/* Referencia */}
      {tipoOrigen === props.modalidad && (
        <CustomInput
          type="text"
          placeholder="Referencia de Ubicación (opcional)"
          value={formData[seccion].referencia || ""}
          onChange={(e) =>
            actualizarDatos(seccion, { referencia: e.target.value })
          }
          min="0.1"
          step="0.1"
        />
      )}

      {/* Fecha */}
      {tipoOrigen === "recojo" && (
        <CustomSelect
          placeholder="Seleccionar Fecha de Recojo"
          value={formData[seccion].fecha || ""}
          options={listaFechas} // El array que ya tienes en data
          onChange={(e) => actualizarDatos(seccion, { fecha: e.target.value })}
        />
      )}
      </div>

      <Mapa direccion={direccionMapa} resetKey={resetKey} />
    </div>
  );
};

export default OrigenCard;
