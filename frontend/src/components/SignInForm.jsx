import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../config/reducer";

export default function SignInForm() {
  const [email, setEamil] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState({
    emailErr: "",
    pwdErr: "",
  });
  const emails = useSelector((state) => state.auth.emails);
  const usersList = useSelector((state) => state.auth.usersList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserByEmail = (email) => {
    const user = usersList.find((u) => u.email === email);
    return user;
  };

  const signIn = (e) => {
    e.preventDefault();
    if (!emails.includes(email)) {
      setErr({
        emailErr: "Votre email n'est pas correct",
        pwdErr: "",
      });
    } else if (pwd !== getUserByEmail(email).pwd) {
      setErr({
        emailErr: "",
        pwdErr: "Votre Mot de passe n'est pas correct",
      });
    } else {
      dispatch(login(getUserByEmail(email)));
      navigate("/accueil");
    }
  };
  return (
    <form onSubmit={signIn}>
      <div className="my-2">
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEamil(e.target.value)}
          required
          placeholder="Tapez ici votre email"
          className="col-12"
          type="email"
        />
        <span className="text-danger">{err.emailErr}</span>
      </div>
      <div className="my-2">
        <label>Mot de passe</label>
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
          placeholder="Tapez ici votre Mot de passe"
          className="col-12"
          type="password"
        />
        <span className="text-danger">{err.pwdErr}</span>
      </div>
      <button className="btn btn-red col-12">Se connecter</button>
    </form>
  );
}
