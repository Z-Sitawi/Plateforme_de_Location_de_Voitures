/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

function SmallCard({ car, ownerID }) {
  return (
    <div className="card m-0">
      <img src={car.image} className="card-img-top" alt={car.mark} />
      <div className="card-body">
        <h2 className="card-title">
          {car.mark} {car.model}
        </h2>
        <div className="d-flex justify-content-between align-items-end">
          <span className="badge bg-danger">{car.price} DH / 24h</span>
          <a target="_blanck" href={`/car/${car.id}/${ownerID}`} className="card-link">
            voir plus
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AvailableCars() {
  const cars = useSelector((state) => state.auth.availableCars);

  return (
    <>
      <MapContainer
        center={[34.021, -6.834]}
        zoom={13}
        style={{
          height: "100vh",
          width: "100%",
          borderRadius: "13px",
          zIndex: "0",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.keys(cars).map((k) => {
          return cars[k].map((car) => {
            if (!car.rented)
              return (
                <Marker
                  onClick={() => alert("helo")}
                  key={car.id}
                  position={[car.lat, car.lng]}
                >
                  <Popup>
                    <SmallCard car={car} ownerID={k}/>
                  </Popup>
                </Marker>
              );
          });
        })}
      </MapContainer>
    </>
  );
}
