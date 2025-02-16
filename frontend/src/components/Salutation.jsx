/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../config/reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hello.css"

function salutation() {
  const currentHour = new Date().getHours();
  if (currentHour < 18) {
    return "Bonjour";
  } else {
    return "Bonsoir";
  }
}

export default function Salutation(props) {
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!logedinUser) {
      navigate("/govroom/login");
    }
  }, [logedinUser, navigate]);

  return (
    <div
      style={{ color: props.color, border: props.border, ...props.style }}
      className={
        "salutation rounded p-3 px-5 d-flex justify-content-between align-items-center " +
        props.className
      }
    >
      <p>
        {`${salutation()} `}
        <span id="hand">👋</span>
        {` ${logedinUser.nom} ${logedinUser.prenom}!`}
        {props.admin && <u className="badge text-danger">Admin</u>}
      </p>
      <i
        onClick={() => dispatch(logout())}
        className="logOutIcon bi bi-box-arrow-right"
      ></i>

    </div>
  );
}
