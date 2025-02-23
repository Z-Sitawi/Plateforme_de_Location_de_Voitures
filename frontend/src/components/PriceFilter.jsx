import { useState, useEffect } from "react";
import "../styles/priceFilter.css";
import { useSelector, useDispatch } from "react-redux";
import { setMaxPrice, setMinPrice } from "../config/reducer";

export default function PriceFilter() {
  const dispatch = useDispatch();
  const minPrice = useSelector((state) => state.filter.elements.minPrice);
  const maxPrice = useSelector((state) => state.filter.elements.maxPrice);
  const [sliderMinValue] = useState(minPrice);
  const [sliderMaxValue] = useState(maxPrice);

  const [minVal, setMinVal] = useState(minPrice);
  const [maxVal, setMaxVal] = useState(maxPrice);

  const [minInput, setMinInput] = useState(minPrice);
  const [maxInput, setMaxInput] = useState(maxPrice);

  const [isDragging, setIsDragging] = useState(false);

  const minGap = 5;

  useEffect(() => {
    dispatch(setMaxPrice(maxVal));
    dispatch(setMinPrice(minVal));
  }, [minVal, maxVal, dispatch]);

  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
    }
  };

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
    }
  };

  const setSliderTrack = () => {
    const range = document.querySelector(".slider-track");

    if (range) {
      const minPercent =
        ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  };

  useEffect(() => {
    setSliderTrack();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal]);

  const handleMinInput = (e) => {
    const value =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (value >= sliderMinValue && value < maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
    }
  };

  const handleMaxInput = (e) => {
    const value =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value > minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (e, type) => {
    if (e.key === "Enter") {
      const value = parseInt(e.target.value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value < maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value > minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="double-slider-box col-12 shadow">
    <label className="text-center col-12"><b>Prix (Dh) par jour</b></label>
      <div className="input-box">
        <div className="min-box">
        <small className="text-start ps-3 d-block">Min</small>
          <input
            type="number"
            value={minInput}
            onChange={handleMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, "min")}
            className="min-input input-number text-center"
            min={sliderMinValue}
            max={maxVal - minGap}
          />
        </div>
        <div className="max-box">
        <small className="text-end pe-3 d-block">Max</small>
          <input
            type="number"
            value={maxInput}
            onChange={handleMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, "max")}
            className="max-input input-number text-center"
            min={minVal + minGap}
            max={sliderMaxValue}
          />
        </div>
      </div>

      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="min-val input-range"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="max-val input-range"
        />
        {isDragging && <div className="min-tooltip">{minVal}</div>}
        {isDragging && <div className="max-tooltip">{maxVal}</div>}
      </div>
    </div>
  );
}
