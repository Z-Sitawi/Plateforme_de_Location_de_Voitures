import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png"
export default function Header() {
  const navigate = useNavigate();

  const onBtnClicked = (e) => {
    let direction = e.target.name
    navigate('/govroom/'+direction)
  }

  return (
    
    <header id="header" className="container d-flex justify-content-between p-3">
      <section className="logo px-4 col-3">
        <img src={logo} alt="GoVroom"/>
      </section>

      <section className="authBtns d-flex gap-3 col-12 col-md-9">
        <button onClick={onBtnClicked} name="signup" className="btn btn-red">s&apos;inscrire</button>
        <button onClick={onBtnClicked} name="login" className="btn btn-white">se connecter</button>
      </section>
    </header>
  );
}
