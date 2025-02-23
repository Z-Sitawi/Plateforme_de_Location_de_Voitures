import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { fuelTypes, colorNames } from "../../assets/statics";
import Card from "../Card";

function Map(prop) {
  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        prop.setCoordinations({ lat, lng });
      },
    });
    return null;
  };

  return (
    <div>
      <MapContainer center={[34.021, -6.834]} zoom={13} className="" id="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {prop.coordinations && (
          <Marker style={{ display: "none" }} position={prop.coordinations}>
            <Popup>
              <span>
                Car Location: {prop.coordinations.lat}, {prop.coordinations.lng}
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

const AddCarForm = () => {
  const [coordinations, setCoordinations] = useState({
    lat: null,
    lng: null,
  });

  const [car, setCar] = useState({
    mark: "",
    model: "",
    year: "",
    kilo: "",
    fuel: "",
    color: "",
    price: "",
    description: "",
    image: "",
  });

  const [displayCard, setDisplayCard] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleImage = (e) => {
    let img = e.target.files[0];
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCar({ ...car, image: String(reader.result) });
      };

      reader.readAsDataURL(img);
    }
  };

  const addCar = (e) => {
    e.preventDefault();
    if (coordinations.lat && coordinations.lng) {
      let newObj = { ...car, ...coordinations };
      setCar(newObj);
      setDisplayCard(true);
    }
    else {
      alert('Veuillez sélectionner un emplacement sur la carte')
    }
  };

  return (
    <div className="d-flex flex-column p-3">
      <Card
        car={car}
        displayCard={displayCard}
        setDisplayCard={setDisplayCard}
        setCoordinations={setCoordinations}
        setCar={setCar}
      />
      <h1 className="text-center">Ajouter un Nouveau Véhicule</h1>
      <form
        onSubmit={addCar}
        className="col-12 d-flex flex-column gap-2 justify-content-center align-items-center"
      >
        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-mark">
            Marque :
          </label>
          <input
            onChange={handleChange}
            className="col-6"
            type="text"
            id="car-mark"
            name="mark"
            required
            value={car.mark}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-name">
            Nom du modèle :
          </label>
          <input
            onChange={handleChange}
            className="col-6"
            type="text"
            id="car-name"
            name="model"
            required
            value={car.model}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-year">
            Année de fabrication :
          </label>
          <input
            onChange={handleChange}
            className="col-6"
            type="number"
            id="car-year"
            name="year"
            required
            value={car.year}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-mileage">
            Kilométrage :
          </label>
          <input
            onChange={handleChange}
            className="col-6"
            type="number"
            id="car-mileage"
            name="kilo"
            required
            value={car.kilo}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-fuel">
            Type de carburant :
          </label>
          <select
            className="col-6 p-1"
            id="car-fuel"
            name="fuel"
            required
            value={car.fuel}
            onChange={handleChange}
          >
            <option value="" disabled>
              Sélectionnez le type de carburant de votre véhicule
            </option>

            {fuelTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-color">
            Couleur :
          </label>
          <select
            value={car.color}
            className="col-6 p-1"
            id="car-color"
            name="color"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionnez la couleur de votre véhicule
            </option>
            {colorNames.map((color, idx) => (
              <option key={idx} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-price">
            Prix par jour (dhs):
          </label>
          <input
            onChange={handleChange}
            className="col-6"
            type="number"
            id="car-price"
            name="price"
            required
            value={car.price}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-description">
            Description :
          </label>
          <textarea
            value={car.description}
            className="col-6"
            id="car-description"
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-between align-items-center col-12">
          <label className="col-6" htmlFor="car-image">
            Téléchargez une image :
          </label>
          <input
            onChange={handleImage}
            className="col-6"
            type="file"
            id="car-image"
            name="image"
            accept="image/*"
            required
          />
        </div>
        <button
          style={{ bottom: "10px" }}
          className="btn btn-red col-11 position-absolute"
        >
          Ajouter
        </button>
      </form>

      <h3 className="my-3">Sélectionnez Localisation du véhicule :</h3>
      <Map coordinations={coordinations} setCoordinations={setCoordinations} />
    </div>
  );
};

export default AddCarForm;
