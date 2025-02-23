import { useSelector } from "react-redux";
import Navigation from "./Navigation";

import Dashboard from "./slideComponents/Dashboard";
import AddCarForm from "./slideComponents/AddCar";
import MyCars from "./slideComponents/MyCars";

export default function Admin() {
  const components = [
    <Dashboard key={0} />,
    <AddCarForm key={1} />,
    <MyCars key={2} />,
  ];
  const componentToShow = useSelector((state) => state.view.componentToShow);
  const navs = [
    { title: "Tableau de Bord", id: 0 },
    { title: "Ajouter Voiture", id: 1 },
    { title: "Mes véhicules", id: 2 },
  ];

  return (
    <div className="position-relative pb-5 bg-test">
      <Navigation type="admin" navs={navs} />
      <main className="main border-danger container position-relative px-3"
      >
        {components[componentToShow]}
      </main>
    </div>
  );
}
