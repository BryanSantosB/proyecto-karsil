import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const useGoogleMaps = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, []);

  return loaded;
};
