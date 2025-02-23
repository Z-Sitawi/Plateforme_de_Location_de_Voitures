/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // Optional, but provides default marker cluster styles

import MarkerClusterGroup from "react-leaflet-markercluster";
import Filters from "../Filters";
import { useEffect, useState } from "react";

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
          <a
            target="_blanck"
            href={`/car/${car.id}/${ownerID}`}
            className="card-link"
          >
            voir plus
          </a>
        </div>
      </div>
    </div>
  );
}

function Map({ cars }) {
  return (
    <>
      <MapContainer
        center={[34.021, -6.834]}
        zoom={6}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "13px",
          zIndex: "0",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
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
                      <SmallCard car={car} ownerID={k} />
                    </Popup>
                  </Marker>
                );
            });
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default function AvailableCars() {
  const cars = useSelector((state) => state.auth.availableCars);
  const [carsCount, setCarsCount] = useState(0);

  useEffect(() => {
    const totalCarsCount = Object.keys(cars).reduce((total, key) => {
      return total + cars[key].length;
    }, 0);

    setCarsCount(totalCarsCount);
  }, [cars]);

  return (
    <>
      <Filters />
      <section className="p-3 ">
        <h6 className="font-FugazOne ps-3 text-light mb-3 bg-dark rounded">
          Voitures disponibles :
          <span className="ms-3 rounded bg-red text-light p-1">
            {carsCount}
          </span>
        </h6>
        <div className="col-12">
          <Map cars={cars} />
        </div>
      </section>
    </>
  );
}
