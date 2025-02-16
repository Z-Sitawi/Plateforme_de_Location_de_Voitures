import { useSelector } from "react-redux";

import Navigation from "./Navigation";
import Dashboard from "./slideComponents/Dashboard";
import AddCarForm from "./slideComponents/AddCar";

export default function Admin() {
  const components = [<Dashboard key={0} />, <AddCarForm key={1} />];
  const componentToShow = useSelector((state) => state.view.componentToShow);
  const navs = [
    { title: "Tableau de Bord", id: 0 },
    { title: "Ajouter Voiture", id: 1 },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh" }} className="">
      <Navigation type="admin" navs={navs} />
      <main className="bg-danger p-5">{components[componentToShow]}</main>
    </div>
  );
}
