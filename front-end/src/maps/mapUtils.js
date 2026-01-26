/* global google */

export const crearMapa = (element, center, zoom = 6) => {
  const map = new google.maps.Map(element, {
    center,
    zoom,
  });

  const marker = new google.maps.Marker({
    map,
    position: center,
  });

  const geocoder = new google.maps.Geocoder();

  return { map, marker, geocoder };
};

export const centrarPorDireccion = (direccion, map, marker, geocoder, zoom = 16) => {
  if (!direccion) return;

  geocoder.geocode({ address: direccion }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      map.setZoom(zoom);
      marker.setPosition(results[0].geometry.location);
    }
  });
};

export const centrarPorCoordenadas = (
  coords,
  map,
  marker,
  zoom = 19,
) => {
  if (!coords?.lat || !coords?.lng) return;

  const position = {
    lat: Number(coords.lat),
    lng: Number(coords.lng),
  };

  map.setCenter(position);
  map.setZoom(zoom);
  marker.setPosition(position);
};


export const resetMapa = (map, marker, center) => {
  if (!map || !marker) return;

  map.setCenter(center);
  map.setZoom(6);
  marker.setPosition(center);
};
