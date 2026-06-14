import { useEffect, useState } from "react";

let isScriptLoading = false;
let isScriptLoaded = false;
const callbacks: (() => void)[] = [];

export function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
      return;
    }

    if (isScriptLoaded) {
      setLoaded(true);
      return;
    }

    const handleScriptLoad = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      setLoaded(true);
      while (callbacks.length > 0) {
        const cb = callbacks.shift();
        if (cb) cb();
      }
    };

    if (isScriptLoading) {
      callbacks.push(handleScriptLoad);
      return;
    }

    isScriptLoading = true;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";
    if (!apiKey) {
      console.warn("GOOGLE_MAPS_API_KEY is not defined in the environment variables.");
      isScriptLoading = false;
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = handleScriptLoad;
    script.onerror = (e) => {
      console.error("Failed to load Google Maps script:", e);
      isScriptLoading = false;
    };
    document.head.appendChild(script);
  }, []);

  return loaded;
}
