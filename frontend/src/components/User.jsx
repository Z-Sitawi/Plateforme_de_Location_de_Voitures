import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import AvailableCars from "./slideComponents/AvailableCars";
import Booking from "./slideComponents/Booking";

export default function User() {
  const components = [<AvailableCars key={0} />, <Booking key={1} />];
  const componentToShow2 = useSelector((state) => state.view.componentToShow2);
  const navs = [
    { title: "Voitures Disponibles", id: 0 },
    { title: "Mes Réservations", id: 1 },
  ];

  return (
    <div className="position-relative pb-5">
      <Navigation type="user" navs={navs} />
      <main className="main mb-5 border-danger container position-relative px-0"
      >
        {components[componentToShow2]}
      </main>
    </div>
  );
}
