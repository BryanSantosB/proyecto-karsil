import { useForm } from "context/FormContext";
import { useEffect, useState } from "react";
//import { ciudadesOrigen } from "data/ciudadesOrigen";
import { listaFechas } from "data/fechasRecojo";
import { useGoogleMaps } from "hooks/useGoogleMaps";
import Mapa from "../shared/Mapa";
import "./c_origen.css";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import CustomInput from "../ui/CustomInput/CustomInput";
import SelectorModalidad from "../ui/SelectorModalidad/SelectorModalidad";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import { api } from "services/api";

const OrigenCard = (props) => {
  const { formData, actualizarDatos } = useForm();
  const mapsLoaded = useGoogleMaps();
  const seccion = props.title.toLowerCase();

  const [ciudadesOrigen, setCiudadesOrigen] = useState([]);
  const [fechasRecojo, setFechasRecojo] = useState([]);
  const [tipoOrigen, setTipoOrigen] = useState(
    formData[seccion].tipo || props.modalidad,
  );
  const [resetKey, setResetKey] = useState(0);
  const [direccionMapa, setDireccionMapa] = useState(
    formData[seccion].direccion || formData[seccion].agencia || "",
  );

  const opciones = [
    { label: props.modalidadText, value: props.modalidad },
    { label: props.agenciaText, value: "agencia" + props.modalidad },
  ];

  useEffect(() => {
    api.get("/locations/ciudades-origen")
      .then((res) => setCiudadesOrigen(res.data))
      .catch(console.error);

    api.get("/fechas/fechas-recojo")
      .then((res) => setFechasRecojo(res.data))
      .catch(console.error);
  }, []);

  const cambiarTipoOrigen = (nuevoTipo) => {
    setTipoOrigen(nuevoTipo);
    actualizarDatos(seccion, { tipo: nuevoTipo });
    setDireccionMapa("");
    nuevoTipo !== "agencia" + props.modalidad &&
      actualizarDatos(seccion, { agencia: "" });
    nuevoTipo === "agencia" + props.modalidad &&
      actualizarDatos(seccion, {
        departamento: "",
        provincia: "",
        distrito: "",
        direccion: "",
        fecha: "",
      });
    setResetKey((k) => k + 1);
  };

  const manejarCambioAgencia = (e) => {
    console.log("Agencia", e.target)
    const agencia = e.target.value;
    tipoOrigen !== props.modalidad && setDireccionMapa(agencia);
    actualizarDatos(seccion, { agencia: agencia });
  };

  const manejarCambioDepartamento = (e) => {
    const indice = e.target.selectedIndex;
    const departamento = e.target.options[indice].text;
    console.log("Departamento seleccionado:", departamento);
    actualizarDatos(seccion, { departamento: departamento });
    manejarCambioAgencia(e);
  }

  const manejarCambioDireccion = (e) => {
    const nuevaDireccion = e.target.value;
    setDireccionMapa(nuevaDireccion);
    actualizarDatos(seccion, { direccion: nuevaDireccion });
  };

  if (!mapsLoaded) return <p>Cargando mapa...</p>;

  return (
    <NeumorphicContainer
      width="100%"
      maxWidth="100%"
      className="mx-auto my-2 p-3 p-md-4"
    >
      <div className="mx-md-5 mt-3 mb-md-5">
        <h2 className="text-center mb-4 fw-bold text-uppercase fs-4">
          {props.title}
        </h2>
        {/* Selector de Modalidad (Agencia/Domicilio) */}
        <div className="mb-4">
          <SelectorModalidad
            opciones={opciones}
            valorSeleccionado={tipoOrigen}
            onChange={(nuevoValor) => cambiarTipoOrigen(nuevoValor)}
          />
        </div>

        {/* Contenedor de Formulario */}
        <div className="d-flex flex-column align-items-center w-100 gap-2 mb-2">
          {tipoOrigen !== props.modalidad && (
            <div className="w-100">
              <CustomSelect
                placeholder="Selecciona una agencia"
                value={formData[seccion].agencia || ""}
                options={ciudadesOrigen}
                onChange={(e) => {
                  manejarCambioAgencia(e);
                }}
                val="label"
                lab="label"
              />
            </div>
          )}

          {tipoOrigen === props.modalidad && (
            <>
              <div className="w-100">
                  
                </div>
              <div className="d-flex gap-2 w-100">
                <div className="w-100">
                  <CustomSelect
                    placeholder="Departamento"
                    value={formData[seccion].agencia || ""}
                    options={ciudadesOrigen}
                    onChange={(e) => {
                      manejarCambioDepartamento(e);
                    }}
                    val="label"
                    lab="departamento"
                  />
                </div>
                <div className="w-100">
                  <CustomInput
                    type="text"
                    placeholder="Provincia"
                    value={formData[seccion].provincia || ""}
                    onChange={(e) =>
                      actualizarDatos(seccion, { provincia: e.target.value })
                    }
                  />
                </div>
                <div className="w-100">
                  <CustomInput
                    type="text"
                    placeholder="Distrito"
                    value={formData[seccion].distrito || ""}
                    onChange={(e) =>
                      actualizarDatos(seccion, { distrito: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-100">
                <CustomInput
                  type="text"
                  placeholder="Dirección exacta"
                  value={formData[seccion].direccion || ""}
                  onChange={manejarCambioDireccion}
                />
              </div>
            </>
          )}

          {tipoOrigen === "recojo" && (
            <div className="w-100">
              <CustomSelect
                placeholder="Fecha de Recojo"
                value={formData[seccion].fecha || ""}
                options={fechasRecojo}
                onChange={(e) =>
                  actualizarDatos(seccion, { fecha: e.target.value })
                }
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
      </div>
    </NeumorphicContainer>
  );
};

export default OrigenCard;
