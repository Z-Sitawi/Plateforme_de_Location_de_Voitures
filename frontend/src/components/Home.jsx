import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const logedinUser = useSelector((state) => state.auth.logedinUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logedinUser) {
      navigate("/govroom/login");
    }
  });
  return <div>Home</div>;
}
