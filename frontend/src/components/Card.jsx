import { useDispatch } from "react-redux";
import { addCar } from "../config/reducer";

/* eslint-disable react/prop-types */
export default function Card(props) {
  const dispatch = useDispatch();

  const confirmer = () => {
    dispatch(addCar(props.car));
    props.setCar({
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
    props.setCoordinations({
      lat: null,
      lng: null,
    });
    props.setDisplayCard(false);
  };

  return (
    <div id="card" className={props.displayCard ? "px-5 py-3 card" : "d-none"}>
      <h2 className="text-center">Résumé de votre Véhicule</h2>

      <img
        className="card-img-top rounded mb-3"
        src={props.car.image || null}
        alt="Car Image"
      ></img>
      <div className="card-body">
        <p>
          <strong>Marque:</strong> {props.car.mark}
        </p>
        <p>
          <strong>Modèle:</strong> {props.car.model}
        </p>
        <p>
          <strong>Année de fabrication:</strong> {props.car.year}
        </p>

        <p>
          <strong>Kilométrage:</strong> {props.car.kilo} Km
        </p>

        <p>
          <strong>Type de carburant:</strong> {props.car.fuel}
        </p>
        <p>
          <strong>Couleur:</strong> {props.car.color}
        </p>
        <p>
          <strong>Prix par jour:</strong> {props.car.price} DH
        </p>
        {props.car.description && (
          <p>
            <strong>Description:</strong>
            <br />
            {props.car.description}
          </p>
        )}
      </div>
      <div className="d-flex justify-content-around">
        <button className="btn btn-success" onClick={confirmer}>
          Confirmer
        </button>
        <button
          className="btn btn-danger"
          onClick={() => props.setDisplayCard(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
