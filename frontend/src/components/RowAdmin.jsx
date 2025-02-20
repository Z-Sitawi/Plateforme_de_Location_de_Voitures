/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refuseRequest,
  getRequests,
  acceptRequest,
  calculatTTR,
} from "../config/reducer";

export default function RowAdmin({ req }) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(" d-none ");
  const logedinUserCars = useSelector((state) => state.auth.logedinUserCars);
  const car = logedinUserCars
    ? logedinUserCars.find((e) => Number(e.id) === Number(req.carId))
    : false;

  const refuse = () => {
    dispatch(
      refuseRequest({
        carId: req.carId,
        clientId: req.clientId,
        ownerId: req.ownerId,
      })
    );
    dispatch(getRequests("admin"));
  };

  const accept = () => {
    dispatch(
      acceptRequest({
        carId: req.carId,
        clientId: req.clientId,
        ownerId: req.ownerId,
        totalPrice: req.totalPrice,
      })
    );
    dispatch(getRequests("admin"));
    dispatch(calculatTTR());
  };

  return (
    <tr>
      {car ? (
        <td className="p-2">
          <p
            onMouseOver={() => setDisplay("")}
            onMouseLeave={() => setDisplay(" d-none ")}
            role="button"
            style={{ textDecoration: "underline" }}
            className="position-relative text-primary text-center text-nowrap"
          >
            {car.mark + " " + car.model}
            <img
              src={car.image}
              alt={car.mark + " " + car.model}
              className={"carImageTD rounded" + display}
            />
          </p>
        </td>
      ) : (
        <td className="text-center align-content-center text-danger">
          <small>Ce véhicule est supprimé</small>
        </td>
      )}
      <td className="text-center align-content-center">{req.pickupDate}</td>
      <td className="text-center align-content-center">{req.returnDate}</td>
      <td className="text-center align-content-center">{req.totalPrice} DH</td>
      <td className="text-center align-content-center">{req.phoneNumber}</td>
      <td className="">
        <button
          style={{ display: req.confirmed ? "none" : "block" }}
          disabled={(req.refused || req.confirmed) && true}
          className="btn-danger my-1 px-2 btn p-0 col-12"
          onClick={refuse}
        >
          Refusé
        </button>
        <button
          style={{ display: req.refused ? "none" : "block" }}
          disabled={(req.refused || req.confirmed) && true}
          className="btn-success my-1 px-1 btn p-0 col-12"
          onClick={accept}
        >
          Accepté
        </button>
      </td>
    </tr>
  );
}
