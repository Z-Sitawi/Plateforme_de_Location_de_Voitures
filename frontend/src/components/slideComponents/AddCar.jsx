import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
/* import L from 'leaflet'; */ 

import "leaflet/dist/leaflet.css";

const AddCarForm = () => {
  // State to store the latitude and longitude
  const [coords, setCoords] = useState({ lat: 51.505, lng: -0.09 });

  // Handle the map click event to set the coordinates
  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setCoords({ lat, lng });
      },
    });
    return null;
  };

  return (
    <div>
      <h2>Add Car Location</h2>
      <form>
        <label htmlFor="car-name">Car Name:</label>
        <input type="text" id="car-name" name="car-name" required />

        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={coords.lat}
          readOnly
        />

        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={coords.lng}
          readOnly
        />
      </form>

      <MapContainer
        center={coords} // Initial center of the map
        zoom={13}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <Marker position={coords}>
          <Popup>
            <span>
              Car Location: {coords.lat}, {coords.lng}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default AddCarForm;
