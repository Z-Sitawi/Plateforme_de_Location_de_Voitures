import { useEffect, useState } from "react";
import "../styles/Form.css";
import logo from "../../public/logo.png";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthPage() {
  const navigate = useNavigate();
  const [action, setAction] = useState();
  const logedinUser = useSelector((data) => data.logedinUser);

  useEffect(() => {
    if (logedinUser) navigate("/accueil");
  }, [logedinUser, navigate]);

  useEffect(() => {
    const url = window.location.pathname;
    const pathSegments = url.split("/")[2];
    setAction(pathSegments);
  }, []);

  if (!logedinUser) {
    return (
      <div
        className="py-5 d-flex flex-column justify-content-center align-items-center bg-dark"
        style={{ minHeight: "100vh" }}
      >
        <img
          src={logo}
          alt="GoVroom"
          loading="lazy"
          className="col-2"
          onClick={() => navigate("/")}
          role="button"
        />
        <div className="From col-11 col-sm-10 col-md-8 col-xl-6">
          <div className="d-flex btnBox">
            <a
              href="/govroom/signup"
              className="col-6 text-center"
              style={
                action === "signup"
                  ? {
                      marginTop: "0px",
                      background:
                        "linear-gradient(to top right, #79001c, #db3153, #79001c)",
                    }
                  : { marginTop: "10px", backgroundColor: "gray" }
              }
            >
              S&apos;inscrire
            </a>
            <a
              href="/govroom/login"
              className="col-6 text-center"
              style={
                action === "login"
                  ? {
                      marginTop: "0px",
                      background:
                        "linear-gradient(to top right, #79001c, #db3153, #79001c)",
                    }
                  : { marginTop: "10px", backgroundColor: "gray" }
              }
            >
              Se connecter
            </a>
          </div>
          <div className="bg-light p-5 formBox">
            {action === "login" ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    );
  }
}
