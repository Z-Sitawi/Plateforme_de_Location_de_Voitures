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
    <div className="position-relative pb-5">
      <Navigation type="admin" navs={navs} />
      <main
        style={{
          border: "5px solid",
          borderRadius: "15px",
          paddingBottom: "100px"
        }}
        className="mb-5 border-danger container bg-dangerr position-relative"
      >
        {components[componentToShow]}
      </main>
    </div>
  );
}
