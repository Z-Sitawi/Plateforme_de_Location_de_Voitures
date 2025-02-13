/* eslint-disable react/prop-types */
import { useState } from "react";
import Salutation from "./Salutation";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  const [displaySideBar, setDisplaySideBar] = useState("-35%");
  const handleDisplaySideBar = () => {
    displaySideBar === "0%"
      ? setDisplaySideBar("-35%")
      : setDisplaySideBar("0%");
  };

  const types = {
    admin: { message: "Passer à l'utilisateur normal", path: "/accueil/user" },
    user: { message: "Passer à l'administrateur", path: "/accueil/admin" },
  };

  return (
    <>
      <nav
        style={{ height: "15vh" }}
        className="d-flex justify-content-between align-items-center mx-2 gap-2"
      >
        <section
          onClick={handleDisplaySideBar}
          role="button"
          className="slideBarBtn d-flex flex-column gap-2 m-1"
        >
          <span className="bg-danger pt-1 px-3"></span>
          <span className="bg-danger pt-1 px-3"></span>
          <span className="bg-danger pt-1 px-3"></span>
        </section>
        <Salutation className="col-11" color={""} border={"5px solid red"} admin={props.type === "admin"? true: false}/>
      </nav>
      <div
        style={{ left: displaySideBar }}
        className="slideBar bg-danger col-4 col-md-3 col-xl-2"
      >
        {["Home", "Settings", "DashBoard", "Statistics"].map((e, i) => (
          <p className="p-3 text-center text-light m-0" key={i}>
            {e}
          </p>
        ))}
        <Link to={types[props.type].path} className="switchUser">
          {types[props.type].message}
        </Link>
      </div>
    </>
  );
}
