import { fuelTypes, colorNames } from "../assets/statics";
import { setFuelOrColor } from "../config/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function SelectsGroup() {
  const dispatch = useDispatch();
  const fuel = useSelector((state) => state.filter.elements.fuel);
  const color = useSelector((state) => state.filter.elements.color);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFuelOrColor({ name, value }));
  };

  return (
    <>
      <div className="mb-2 d-flex flex-column justify-content-between align-items-center col-12">
        <label className="col-12" htmlFor="car-fuel">
          <b>Type de carburant :</b>
        </label>
        <select
          className="col-12 p-2 rounded shadow bg-light"
          id="car-fuel"
          name="fuel"
          required
          value={fuel}
          onChange={handleChange}
        >
          <option value="" disabled>
            Sélectionnez le type de carburant de votre véhicule
          </option>

          {fuelTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center col-12">
        <label className="col-12" htmlFor="car-color">
          <b>Couleur :</b>
        </label>
        <select
          value={color}
          className="col-12 p-2 rounded shadow bg-light"
          id="car-color"
          name="color"
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez la couleur de votre véhicule
          </option>
          {colorNames.map((color, idx) => (
            <option key={idx} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
