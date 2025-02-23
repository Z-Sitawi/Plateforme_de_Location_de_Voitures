import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../config/reducer";
import RowUser from "../RowUser";

export default function Booking() {
  const userRequests = useSelector((state) => state.auth.userRequests) || [];
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
    <div className="m-3" style={{ overflowX: "scroll", textWrap: 'nowrap' }}>
      <table className="table table-bordered border-0">
        <thead>
          <tr className="bg-dark text-light text-nowrap">
            <th className="text-center">Véhicule</th>
            <th className="text-center">Date de Prise en Charge</th>
            <th className="text-center">Date de retour</th>
            <th className="text-center">Total à payer</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Action</th>
          </tr>
          {userRequests.map((obj, idx) => {
            return <RowUser key={idx} req={obj} />;
          })}
        </thead>
      </table>
    </div>
  );
}
