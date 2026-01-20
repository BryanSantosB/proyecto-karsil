import { useForm } from "../../context/FormContext";
import { useState } from "react";
import { ciudadesOrigen } from "../../data/ciudadesOrigen";
import { listaFechas } from "../../data/fechasRecojo";
import { useGoogleMaps } from "../../hooks/useGoogleMaps";
import Mapa from "./Mapa";
import "./styles/c_origen.css";

const OrigenCard = (props) => {
  const { formData, actualizarDatos } = useForm();
  const mapsLoaded = useGoogleMaps();
  const seccion = props.title.toLowerCase();

  const [tipoOrigen, setTipoOrigen] = useState(formData[seccion].tipo || props.modalidad);
  const [resetKey, setResetKey] = useState(0);
  const [direccionMapa, setDireccionMapa] = useState(formData[seccion].direccion || formData[seccion].ciudad || "");

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
    <div className="card">
      <h2 className="title">{props.title}</h2>

      {/* Radios */}
      <div className="option-buttons">
        <label className="option">
          <input
            type="radio"
            value={props.modalidad}
            checked={tipoOrigen === props.modalidad}
            onChange={() => cambiarTipoOrigen(props.modalidad)}
          />
          <span>{props.modalidadText}</span>
        </label>

        <label className="option">
          <input
            type="radio"
            value="agencia"
            checked={tipoOrigen === "agencia"}
            onChange={() => cambiarTipoOrigen("agencia")}
          />
          <span>{props.agenciaText}</span>
        </label>
      </div>

      {/* Ciudad */}
      <div className="form-group w-75">
        <select
          id={"ciudad" + props.modalidad}
          className="form-select form-select-sm"
          value={formData[seccion].ciudad || ""} // Lee del contexto
          onChange={manejarCambioCiudad}
        >
          <option value="">Seleccionar ciudad</option>
          {ciudadesOrigen.map((c) => (
            <option key={c.label} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dirección */}
      {tipoOrigen === props.modalidad && (
        <input
          id={"direccion" + props.modalidad}
          className="form-group w-75"
          type="text"
          placeholder="Dirección"
          value={formData[seccion].direccion || ""} // Lee del contexto
          onChange={manejarCambioDireccion}
        />
      )}

      {/* Referencia */}
      {tipoOrigen === props.modalidad && (
        <div className="form-group w-75">
          <input
            type="text"
            className="form-control"
            id={"referencia" + props.modalidad}
            placeholder="Referencia de Ubicación"
            value={formData[seccion].referencia || ""} // Lee del contexto
            onChange={(e) => actualizarDatos(seccion, { referencia: e.target.value })}
          />
        </div>
      )}

      {/* Fecha */}
      {tipoOrigen === "recojo" && (
        <div className="form-group w-75">
          <select
            className="form-select form-select-sm"
            value={formData[seccion].fecha || ""} // Ya lo tenías bien aquí
            onChange={(e) => actualizarDatos(seccion, { fecha: e.target.value })}
          >
            <option value="">Seleccionar Fecha de Recojo</option>
            {listaFechas.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <Mapa direccion={direccionMapa} resetKey={resetKey} />
    </div>
  );
};

export default OrigenCard;