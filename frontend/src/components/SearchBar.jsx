import { useDispatch, useSelector } from "react-redux";
import { setMarkOrModel, filterCars } from "../config/reducer";
import { useState } from "react";

export default function SearchBar() {
  const filters = useSelector((state) => state.filter.elements);
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();
  const search = () => {
    dispatch(filterCars(filters));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputVal(value);
    dispatch(setMarkOrModel(value));
  };

  return (
    <div className="d-flex col-12 gap-1">
      <input
        value={inputVal}
        type="text"
        className="col-9 rounded ps-3"
        placeholder="Marque,  Modèle"
        onChange={handleChange}
      />
      <button onClick={search} className="btn btn-red col-3">
        Filtrer
      </button>
    </div>
  );
}
