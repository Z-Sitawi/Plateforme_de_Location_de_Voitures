import "./styles/App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function App() {
  const logedinUser = useSelector((data) => data.logedinUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (logedinUser) navigate("/accueil");
  }, [logedinUser, navigate]);

  useEffect(() => {
    const usersId = localStorage.getItem("usersId");
    const usersList = localStorage.getItem("usersList");
    if (!usersId) localStorage.setItem("usersId", JSON.stringify(0));
    else if (!usersList) localStorage.setItem("usersList", JSON.stringify([]));
  }, []);

  if (!logedinUser) {
    return (
      <div id="app">
        <Header />
        <h1 className="slogan text-center text-light px-5">
          <span className="display-1">Votre Voiture, Votre Liberté</span>
          <br />
          <span className="display-4">
            Louez Facilement en Ligne avec GoVroom
          </span>
        </h1>
      </div>
    );
  }
}
