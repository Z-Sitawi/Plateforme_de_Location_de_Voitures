import PriceFilter from "./PriceFilter";
import SelectsGroup from "./SelectsGroup";
import SearchBar from "./SearchBar";

export default function Filters() {
  return (
    <div className="">
      <div className="col-12 p-4">
        <SearchBar />
      </div>
      <div className="clo-12 d-flex flex-wrap">
        <div className="p-3 col-12 col-md-6">
          <PriceFilter />
        </div>
        <div className="p-3 col-12 col-md-6">
          <SelectsGroup />
        </div>
      </div>
    </div>
  );
}
