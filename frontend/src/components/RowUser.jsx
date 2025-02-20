/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "../config/reducer";

export default function Row({ req }) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(" d-none ");

  const availableCars = useSelector((state) => state.auth.availableCars)[
    req.ownerId
  ];
  const [status, setStatus] = useState({ title: "", bgColor: "" });

  const car = availableCars
    ? availableCars.find((e) => Number(e.id) === Number(req.carId))
    : [];

  useEffect(() => {
    if (req.confirmed) setStatus({ title: "accepté", bgColor: "bg-success" });
    else if (req.refused) setStatus({ title: "refusé", bgColor: "bg-danger" });
    else setStatus({ title: "en attente", bgColor: "bg-warning text-dark" });
  }, [req.confirmed, req.refused]);

  const Supprimer = () => {
    dispatch(
      deleteRequest({
        type: "user",
        carId: req.carId,
        ownerId: req.ownerId,
        clientId: req.clientId,
      })
    );
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
      <td className="text-center align-content-center">
        <span className={"badge " + status.bgColor}>{status.title}</span>
      </td>
      <td className="text-center align-content-center">
        {req.refused && (
          <button className="btn-danger btn p-0 px-1" onClick={Supprimer}>
            Supprimer
          </button>
        )}

        {req.confirmed && (
          <button
            disabled
            className="btn-danger btn p-0 px-1"
            onClick={Supprimer}
          >
            Supprimer
          </button>
        )}

        {!req.confirmed && !req.refused && (
          <button className="btn-danger btn p-0 px-1">Annuler</button>
        )}
      </td>
    </tr>
  );
}
