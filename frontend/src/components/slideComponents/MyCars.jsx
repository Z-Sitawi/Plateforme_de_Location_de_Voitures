/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { delCar } from "../../config/reducer";

function CarInfo(props) {
  const dispatch = useDispatch();

  const deleteCar = (e) => {
    let id = Number(e.target.id);
    let confirm = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet élément ?"
    );
    if (confirm) dispatch(delCar(id));
  };

  return (
    <div
      className="d-flex flex-wrap gap-3 justify-content-between py-3"
      style={{ borderBottom: "1px solid" }}
    >
      <img
        style={{ width: "200px", height: "200px" }}
        className="rounded"
        src={props.car.image}
      ></img>

      <div className="col-12 col-md-6 d-flex flex-column">
        <span>
          <strong>Marque:</strong> {props.car.mark}
        </span>
        <span>
          <strong>Modèle:</strong> {props.car.model}
        </span>
        <span>
          <strong>Année de fabrication:</strong> {props.car.year}
        </span>
        <span>
          <strong>Kilométrage:</strong> {props.car.kilo} Km
        </span>
        <span>
          <strong>Type de carburant:</strong> {props.car.fuel}
        </span>
        <span>
          <strong>Couleur:</strong> {props.car.color}
        </span>
        <span>
          <strong>Prix par jour:</strong>
          <span>{props.car.price} DH</span>
        </span>
      </div>

      <div className="col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center gap-3">
        <h6
          id={props.car.id}
          onClick={deleteCar}
          role="button"
          className="text-danger Supprimer"
        >
          Supprimer
        </h6>

        {props.car.rented ? (
          <div className="d-flex gap-3">
            <b>status:</b>

            <button className="badge border-0 p-2 bg-success">Loué</button>
          </div>
        ) : (
          <div className="d-flex gap-3">
            <b>status:</b>
            <button className="badge border-0 p-2 bg-danger">Non loué</button>
          </div>
        )}
      </div>

      {props.car.description && (
        <div className="col-12 mt-1">
          <p>
            <strong>Description:</strong>
            <br />
            {props.car.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default function MyCars() {
  const myCars = useSelector((state) => state.auth.logedinUserCars);

  return (
    <div>
      {!myCars || myCars.length > 0 ? (
        myCars.map((car, idx) => <CarInfo key={idx} car={car} />)
      ) : (
        <h1 className="text-danger text-center pt-5">Aucune voiture trouvée</h1>
      )}
    </div>
  );
}
