import { useForm } from "context/FormContext";
import { useEffect, useState } from "react";
import Mapa from "../shared/Mapa";
import "./c_origen.css";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import CustomInput from "../ui/CustomInput/CustomInput";
import SelectorModalidad from "../ui/SelectorModalidad/SelectorModalidad";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import { api } from "services/api";
import { buscarPorAgencia } from "utils/buscarPorAgencia";

const OrigenCard = (props) => {
  const { formData, actualizarDatos } = useForm();
  const seccion = props.title.toLowerCase();

  const [ciudadesOrigen, setCiudadesOrigen] = useState(
    props.ciudadesOrigen || [],
  );

  const [ciudades, setCiudades] = useState([]);

  const [fechas, setFechas] = useState([]);

  const valorInicial = formData[seccion].agencia
    ? formData[seccion].tipo
    : "agencia" + props.modalidad;

  const [tipoOrigen, setTipoOrigen] = useState(valorInicial);

  const [resetKey, setResetKey] = useState(0);
  const [direccionMapa, setDireccionMapa] = useState(
    formData[seccion].direccion || formData[seccion].agencia || "",
  );
  const [coordenadas, setCoordenadas] = useState(null);

  const opciones = [
    {
      nombre: props.modalidadText,
      value: props.modalidad,
      name: "modalidad",
      icon: `/public/icons/icon_caja.png`,
    },
    {
      nombre: props.agenciaText,
      value: "agencia" + props.modalidad,
      name: "modalidad",
      icon: `/public/icons/icon_agencia.png`,
    },
  ];

  useEffect(() => {
    api
      .get("/locations/ciudades-origen")
      .then((res) => setCiudadesOrigen(res.data))
      .catch(console.error);

    api
      .get("/ciudades/")
      .then((res) => {
        setCiudades(res.data.data);
      })
      .catch(console.error);

    api
      .get("/fechas/fechas")
      .then((res) => {
        const fechasData = res.data.data;
        const fechasNormalizadas = fechasData.map((f) => ({
          ...f,
          fecha: f.fecha.split("T")[0],
        }));
        setFechas(fechasNormalizadas);
      })
      .catch(console.error);

    actualizarDatos(seccion, {
      tipo: "agencia" + props.modalidad,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cambiarTipoOrigen = (nuevoTipo) => {
    console.log("CIUDADES: ", ciudades);
    console.log("CIUDADES ORIGEN: ", ciudadesOrigen);

    console.log("CAMBIANDO TIPO DE ORIGEN A:", nuevoTipo);
    setTipoOrigen(nuevoTipo);
    actualizarDatos(seccion, { tipo: nuevoTipo });
    setDireccionMapa("");
    setCoordenadas(null);
    nuevoTipo === props.modalidad && actualizarDatos(seccion, { agencia: "" });
    nuevoTipo === "agencia" + props.modalidad &&
      actualizarDatos(seccion, {
        departamento: "",
        provincia: "",
        distrito: "",
        direccion: "",
        fecha: "",
      });

    setResetKey((k) => k + 1);
    console.log("SET KEY: ", resetKey);
    console.log(formData);
  };

  const manejarCambioAgencia = (e) => {
    console.log("CIUDADES: ", ciudades);
    console.log("FECHAS: ", fechas);

    const agencia = e.target.value;

    // Buscas el objeto en tu lista original de datos
    const itemOriginal = ciudades.find((a) => a.nombre === agencia);

    console.log("ID DE LA AGENCIA", itemOriginal.id);

    console.log("AGENCIA: ", agencia);
    const direccionDelMapa = buscarPorAgencia(ciudades, agencia);
    console.log("DIRECCION DEL MAPA: ", direccionDelMapa);
    const latAndlog = {
      lat: direccionDelMapa.latitud || null,
      lng: direccionDelMapa.longitud || null,
    };
    tipoOrigen !== props.modalidad &&
      setDireccionMapa(direccionDelMapa.direccion);
    tipoOrigen !== props.modalidad && setCoordenadas(latAndlog);
    actualizarDatos(seccion, { agencia: agencia });
    actualizarDatos(seccion, { agenciaCiudadId: itemOriginal.id });
  };

  const manejarCambioDepartamento = (e) => {
    const indice = e.target.selectedIndex;
    const departamento = e.target.options[indice].text;
    actualizarDatos(seccion, { departamento: departamento });
    manejarCambioAgencia(e);
  };

  const manejarCambioDireccion = (e) => {
    const nuevaDireccion = e.target.value;
    setDireccionMapa(nuevaDireccion);
    actualizarDatos(seccion, { direccion: nuevaDireccion });
  };

  const actualizarFechas = (e) => {
    const fechaSeleccionada = e.target.value;
    const fechaOriginal = fechas.find((a) => a.fecha === fechaSeleccionada);

    console.log(fechaOriginal.id);
    actualizarDatos(seccion, { fecha: fechaSeleccionada });
  };

  return (
    <NeumorphicContainer
      width="100%"
      maxWidth="100%"
      className="mx-auto my-2 p-3 p-md-4"
    >
      <div className="mt-1 mb-md-1">
        <h2 className="text-center mb-3 fw-bold text-uppercase fs-4">
          {props.title}
        </h2>
        {/* Selector de Modalidad (Agencia/Domicilio) */}
        <div className="mb-3">
          <SelectorModalidad
            opciones={opciones}
            valorSeleccionado={tipoOrigen}
            onChange={(nuevoValor) => cambiarTipoOrigen(nuevoValor)}
          />
        </div>

        {/* Contenedor de Formulario */}
        <div className="d-flex flex-column align-items-center w-100 gap-2 mb-2">
          {tipoOrigen !== props.modalidad && (
            <div className="w-100 mb-2">
              <CustomSelect
                placeholder="Selecciona una agencia"
                value={formData[seccion].agencia || ""}
                options={ciudades}
                onChange={(e) => {
                  manejarCambioAgencia(e);
                }}
                val="nombre"
                lab="nombre"
              />
            </div>
          )}

          {tipoOrigen === props.modalidad && (
            <>
              {/* Cambiamos d-flex por flex y definimos la dirección */}
              <div className="flex flex-col md:flex-row gap-2 w-full mb-2">
                <div className="w-full">
                  <CustomSelect
                    placeholder="Departamento"
                    value={formData[seccion].agencia || ""}
                    options={ciudades}
                    onChange={(e) => manejarCambioDepartamento(e)}
                    val="nombre"
                    lab="departamento.nombre"
                  />
                </div>

                <div className="w-full">
                  <CustomInput
                    type="text"
                    placeholder="Provincia"
                    value={formData[seccion].provincia || ""}
                    onChange={(e) =>
                      actualizarDatos(seccion, { provincia: e.target.value })
                    }
                  />
                </div>

                <div className="w-full">
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
              <div className="w-100 mb-2">
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
            <div className="w-100 mb-2">
              <CustomSelect
                placeholder="Fecha de Recojo"
                value={formData[seccion].fecha || ""}
                options={fechas}
                onChange={actualizarFechas}
                val="fecha"
                lab="fecha"
              />
            </div>
          )}
        </div>

        {/* Contenedor del Mapa */}
        <div className="w-100 mt-auto">
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
            <Mapa
              direccion={direccionMapa}
              coordenadas={coordenadas}
              resetKey={resetKey}
            />
          </div>
        </div>
      </div>
    </NeumorphicContainer>
  );
};

export default OrigenCard;
