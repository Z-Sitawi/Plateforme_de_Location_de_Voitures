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
    <>
      {TTR > 0 && (
        <h1 className="py-3 text-center">
          Revenu Total: <small><b>{TTR}</b></small> Dh
        </h1>
      )}
      <div
        style={{ overflowX: "scroll" }}
        className="col-12 p-3"
      >
        <table className="table table-bordered border-0">
          <thead>
            <tr className="table-dark">
              <th className="text-center">Véhicule</th>
              <th className="text-center">Date de Prise en Charge</th>
              <th className="text-center">Date de retour</th>
              <th className="text-center">Total à payer</th>
              <th className="text-center">Tél</th>
              <th className="text-center">Action</th>
            </tr>
            {adminRequests.map((obj, idx) => {
              return <RowAdmin key={idx} req={obj} />;
            })}
          </thead>
        </table>
      </div>
    </>
  );
}
