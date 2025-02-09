import { useState } from "react";
import { useSelector } from "react-redux";

export default function SignUpForm() {
  const usersList = useSelector((data) => data.usersList);
  const usersId = useSelector((data) => data.usersId);
  const emails = useSelector((data) => data.emails);

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

  const addUser = () => {
    let { nom, prenom, email, pwd } = user;
    let newData = [...usersList, { id: usersId, nom, prenom, email, pwd }];
    localStorage.setItem("usersList", JSON.stringify(newData));
    localStorage.setItem("usersId", JSON.stringify(usersId + 1));
    clear();
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
      addUser();
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
