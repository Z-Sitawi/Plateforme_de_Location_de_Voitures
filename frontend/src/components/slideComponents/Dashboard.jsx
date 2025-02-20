import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, calculatTTR } from "../../config/reducer";
import RowAdmin from "../RowAdmin";

export default function Dashboard() {
  const dispatch = useDispatch();
  const adminRequests = useSelector((state) => state.auth.adminRequests) || [];
  const TTR = useSelector((state) => state.auth.TTR) || 0;

  useEffect(() => {
    dispatch(getRequests("admin"));
    dispatch(calculatTTR());
  }, [dispatch]);

  if (adminRequests.length === 0) {
    return (
      <div className="text-center text-danger display-2 p-5">
        Aucune demande trouvée
      </div>
    );
  }
  return (
    <div className="m-3 ">
      {TTR > 0 && (
        <h1 className="py-3 display-4">
          Revenu Total: <b>{TTR}</b> Dh
        </h1>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">Véhicule</th>
            <th className="text-center">Date de Prise en Charge</th>
            <th className="text-center">Date de retour</th>
            <th className="text-center">Total à payer</th>
            <th className="text-center">Tél</th>
            <th className="text-center"></th>
          </tr>
          {adminRequests.map((obj, idx) => {
            return <RowAdmin key={idx} req={obj} />;
          })}
        </thead>
      </table>
    </div>
  );
}
