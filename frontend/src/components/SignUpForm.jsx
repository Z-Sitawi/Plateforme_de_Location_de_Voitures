import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../config/reducer";

export default function SignUpForm() {
  const usersId = useSelector((state) => state.auth.usersId);
  const emails = useSelector((state) => state.auth.emails);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });

  const [err, setErr] = useState({
    emailErr: "",
    pwdErr: "",
  });

  const [created, setCreated] = useState(false);

  const handleOnchange = (e) => {
    let { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const clear = () => {
    setErr({ emailErr: "", pwdErr: "" });
    setUser({
      nom: "",
      prenom: "",
      email: "",
      pwd: "",
      confirmPwd: "",
    });
  };

  const signup = (e) => {
    e.preventDefault();

    if (emails.includes(user.email)) {
      setErr({ emailErr: "Cet e-mail existe déjà", pwdErr: "" });
    } else if (user.pwd !== user.confirmPwd) {
      setErr({
        emailErr: "",
        pwdErr: "Les mots de passe ne correspondent pas",
      });
    } else {
      dispatch(
        addUser({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          pwd: user.pwd,
          id: usersId,
        })
      );
      clear();
      setCreated(true);
    }
  };

  return (
    <form onSubmit={signup}>
      <div className="my-2">
        {created && (
          <div className="alert alert-success">
            Votre compte a été créé avec succès{" "}
            <a href="/govroom/login" className="alert-link">
              Se connecter
            </a>
          </div>
        )}
        <label htmlFor="nom">Nom:</label>
        <input
          autoComplete="true"
          required
          onChange={handleOnchange}
          id="nom"
          placeholder="Tapez ici votre nom"
          className="col-12"
          type="text"
          value={user.nom}
        />
      </div>
      <div className="my-2">
        <label htmlFor="prenom">Prénom:</label>
        <input
          autoComplete="true"
          required
          onChange={handleOnchange}
          id="prenom"
          placeholder="Tapez ici votre prénom"
          className="col-12"
          type="text"
          value={user.prenom}
        />
      </div>
      <div className="my-2">
        <label htmlFor="email">Email:</label>
        <input
          autoComplete="true"
          required
          onChange={handleOnchange}
          id="email"
          placeholder="Tapez ici votre email"
          className="col-12"
          type="email"
          value={user.email}
        />
        <span className="text-danger">{err.emailErr}</span>
      </div>
      <div className="my-2">
        <label htmlFor="pwd">Mot de passe</label>
        <input
          autoComplete="true"
          required
          onChange={handleOnchange}
          id="pwd"
          placeholder="Tapez ici votre Mot de passe"
          className="col-12"
          type="password"
          value={user.pwd}
        />
        <span className="text-danger">{err.pwdErr}</span>
      </div>
      <div className="my-2">
        <label htmlFor="confirmPwd">Confirmez le mot de passe</label>
        <input
          autoComplete="true"
          required
          onChange={handleOnchange}
          id="confirmPwd"
          placeholder="Tapez ici votre Mot de passe"
          className="col-12"
          type="password"
          value={user.confirmPwd}
        />
        <span className="text-danger">{err.pwdErr}</span>
      </div>
      <button className="btn btn-red col-12">S&apos;inscrire</button>
    </form>
  );
}
