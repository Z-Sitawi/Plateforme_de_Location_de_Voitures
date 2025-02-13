import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../config/reducer";

const style = {
  position: "absolute",
  bottom: "10px"
}

export default function Home() {
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!logedinUser) {
      navigate("/govroom/login");
    }
  }, [logedinUser, navigate]);

  function logOut () {
    dispatch(logout())
  }

  return (
    <div
      className="bg-danger d-flex flex-wrap justify-content-around align-items-center"
      style={{
        position: "relative",
        height: "100vh",
        background: "linear-gradient(to top right, #79001c, #db3153, #79001c)",
      }}
    >
      <button
        className="font-FugazOne btn btn-white p-3 p-md-5 col-5"
        onClick={() => navigate("/accueil/user")}
      >
        Utilisateur Régulier
      </button>
      <button
        className="font-FugazOne btn btn-white p-3 p-md-5 col-5"
        onClick={() => navigate("/accueil/admin")}
      >
        Utilisateur <span className="text-danger">Admin</span>
      </button>
      
      <button onClick={logOut} className="btn btn-dark" style={style}>Se Déconnecter</button>
    </div>
  );
}
