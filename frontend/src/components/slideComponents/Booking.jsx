/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../config/reducer";

function Row({ req }) {
  const availableCars = useSelector((state) => state.auth.availableCars)[
    req.ownerId
  ];
  const [status, setStatus] = useState({ title: "", bgColor: "" });
  const car = availableCars.find((e) => Number(e.id) === Number(req.carId));

  useEffect(() => {
    if (req.confirmed) setStatus({ title: "accepté", bgColor: "bg-success" });
    else if (req.refused) setStatus({ title: "refusé", bgColor: "bg-danger" });
    else setStatus({ title: "en attente", bgColor: "bg-warning text-dark" });
  }, [req.confirmed, req.refused]);

  return (
    <tr>
      <td className="text-center align-content-center">{`${car.mark} ${car.model}`}</td>
      <td className="text-center align-content-center">{req.pickupDate}</td>
      <td className="text-center align-content-center">{req.returnDate}</td>
      <td className="text-center align-content-center">{req.totalPrice} DH</td>
      <td className="text-center align-content-center">
        <span className={"badge " + status.bgColor}>{status.title}</span>
      </td>
      <td className="text-center align-content-center">
        {!req.confirmed && !req.refused && (
          <button className="btn-danger btn p-0 px-1">Annuler</button>
        )}
      </td>
    </tr>
  );
}

export default function Booking() {
  const userRequests = useSelector((state) => state.view.userRequests) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests("user"));
  }, [dispatch]);

  if (userRequests.length === 0) {
    return (
      <div className="text-center text-danger display-2 p-5">
        Aucune demande trouvée
      </div>
    );
  }
  return (
    <div className="m-3">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">Véhicule</th>
            <th className="text-center">Date de Prise en Charge</th>
            <th className="text-center">Date de retour</th>
            <th className="text-center">Total à payer</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Action</th>
          </tr>
          {userRequests.map((obj, idx) => {
            return <Row key={idx} req={obj} />;
          })}
        </thead>
      </table>
    </div>
  );
}
