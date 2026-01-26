import { useEffect, useRef } from "react";
import { crearMapa, centrarPorDireccion, centrarPorCoordenadas, resetMapa } from "maps/mapUtils";

const peru = { lat: -9.19, lng: -75.0152 };

const Mapa = ({ direccion, coordenadas, resetKey }) => {
  const divRef = useRef(null);

  // refs del mapa
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  // Crear mapa (solo una vez)
  useEffect(() => {
    if (!window.google) return;
    if (!divRef.current) return;
    if (mapRef.current) return;

    const { map, marker, geocoder } = crearMapa(divRef.current, peru);

    mapRef.current = map;
    markerRef.current = marker;
    geocoderRef.current = geocoder;
  }, []);

  // Reaccionar a dirección / reset
  useEffect(() => {
    if (!mapRef.current) return;
    console.log("Mapa actualizado con:", { direccion, coordenadas, resetKey });

    // 1️⃣ prioridad: coordenadas exactas
    if (coordenadas?.lat && coordenadas?.lng) {
      centrarPorCoordenadas(
        coordenadas,
        mapRef.current,
        markerRef.current,
      );
      return;
    }

    // 2️⃣ fallback: dirección
    if (direccion) {
      centrarPorDireccion(
        direccion,
        mapRef.current,
        markerRef.current,
        geocoderRef.current,
      );
      return;
    }

    // 3️⃣ reset
    resetMapa(mapRef.current, markerRef.current, peru);
  }, [direccion, coordenadas, resetKey]);

  return (
    <div
      ref={divRef}
      className="w-100 h-100"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#e5e3df",
      }}
    />
  );
};

export default Mapa;
