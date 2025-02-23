import "./styles/App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function App() {
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (logedinUser) navigate("/accueil");
  }, [logedinUser, navigate]);

  useEffect(() => {
    const usersId = localStorage.getItem("usersId");
    const usersList = localStorage.getItem("usersList");
    const cars = localStorage.getItem("cars");

    if (!usersId) localStorage.setItem("usersId", JSON.stringify(0));
    else if (!usersList) localStorage.setItem("usersList", JSON.stringify([]));
    else if (!cars) localStorage.setItem("cars", JSON.stringify({}));
  }, []);

  if (!logedinUser) {
    return (
      <div id="app">
        <Header />
        <h1 className="text-center text-light px-2 my-5 px-lg-5">
          <span className="slogan1">Votre Voiture, Votre Liberté</span>
          <br />
          <span className="slogan2">
            Louez Facilement en Ligne avec GoVroom
          </span>
        </h1>
      </div>
    );
  }
}
