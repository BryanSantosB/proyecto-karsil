import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

let googleMapsPromise;

export const useGoogleMaps = () => {
  const [loaded, setLoaded] = useState(!!window.google?.maps);

  useEffect(() => {
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    if (!googleMapsPromise) {
      googleMapsPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }

    googleMapsPromise.then(() => setLoaded(true));
  }, []);

  return loaded;
};

