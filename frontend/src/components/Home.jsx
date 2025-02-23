import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../config/reducer";

const style = {
  position: "absolute",
  bottom: "10px",
};

export default function Home() {
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!logedinUser) {
      navigate("/govroom/login");
    }
  }, [logedinUser, navigate]);

  function logOut() {
    dispatch(logout());
  }

  return (
    <div
      className="d-flex flex-wrap-reverse justify-content-around align-items-center diagonal-background"
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <button
        className="z-100 btn btn-white font-FugazOne shadow p-3 mb-5 rounded"
        onClick={() => navigate("/accueil/user")}
      >
        Utilisateur Régulier
      </button>
      <button
        className="z-100 btn btn-red font-FugazOne shadow p-3 mb-5 rounded"
        onClick={() => navigate("/accueil/admin")}
      >
        Utilisateur <span id="adminTxt">Admin</span>
      </button>

      <button onClick={logOut} className="z-100 btn btn-dark" style={style}>
        Se Déconnecter
      </button>
    </div>
  );
}
