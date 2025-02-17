/* eslint-disable react/prop-types */
import { useState } from "react";
import Salutation from "./Salutation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeComponent } from "../config/reducer";

export default function Navigation(props) {
  const dispatch = useDispatch();
  const [displaySideBar, setDisplaySideBar] = useState("-100%");
  const handleDisplaySideBar = () => {
    displaySideBar === "0%"
      ? setDisplaySideBar("-100%")
      : setDisplaySideBar("0%");
  };

  const types = {
    admin: { message: "Passer à l'utilisateur normal", path: "/accueil/user" },
    user: { message: "Passer à l'administrateur", path: "/accueil/admin" },
  };

  const changeComp = (e) => {
    const id = Number(e.target.id);
    dispatch(changeComponent({id, type: props.type}));
    setDisplaySideBar("-100%");
  };

  return (
    <>
      <nav
        style={{ height: "180px" }}
        className="p-2 gap-2 d-flex justify-content-around align-items-center col-12"
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
        <Salutation
          className="col-md-10 col-xl-11"
          color={""}
          admin={props.type === "admin" ? true : false}
        />
      </nav>
      <div
        style={{ left: displaySideBar }}
        className="slideBar bg-danger col-8 col-md-5 col-lg-3 col-xl-2"
      >
        {props.navs.map((e, i) => (
          <p
            onClick={changeComp}
            className="p-3 text-center text-light m-0"
            key={i}
            id={e.id}
          >
            {e.title}
          </p>
        ))}
        <Link to={types[props.type].path} className="switchUser">
          {types[props.type].message}
        </Link>
      </div>
    </>
  );
}
