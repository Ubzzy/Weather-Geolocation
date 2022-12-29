import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import env from "react-dotenv";

const mapContainerStyle = {
  width: "100vh",
  height: "400px"
};

const center = {
  lat: 0,
  lng: 0
};

const options = {
  zoomControl: true
};

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: env.MAP_API
  });
  const [currentLocation, setCurrentLocation] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.log("Error getting location");
        }
      );
    }
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={currentLocation}
      options={options}
    />
  );
}

export default Map;
