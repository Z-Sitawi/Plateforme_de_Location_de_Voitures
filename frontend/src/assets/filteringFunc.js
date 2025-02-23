function filterByPrice(carsToFilter, minPrice, maxPrice) {
  if (Object.keys(carsToFilter).length === 0 || !carsToFilter) return {};

  let newAvailableCars = {};
  Object.keys(carsToFilter).forEach((key) => {
    let carsList = [];

    carsToFilter[key].forEach((car) => {
      const price = Number(car.price);
      if (price >= minPrice && price <= maxPrice) carsList.push(car);
    });

    if (carsList.length > 0) newAvailableCars[key] = carsList;
  });

  return Object.keys(newAvailableCars).length > 0 ? newAvailableCars : {};
}

function filterByMark(carsToFilter, mark) {
  if (Object.keys(carsToFilter).length === 0 || !carsToFilter || mark === "")
    return carsToFilter;

  let newAvailableCars = {};

  Object.keys(carsToFilter).forEach((key) => {
    let carsList = [];

    carsToFilter[key].forEach((car) => {
      if (mark.toLowerCase().trim() === car.mark.toLowerCase().trim())
        carsList.push(car);
    });

    if (carsList.length > 0) newAvailableCars[key] = carsList;
  });

  return Object.keys(newAvailableCars).length > 0 ? newAvailableCars : {};
}

function filterByModel(carsToFilter, model) {
  if (Object.keys(carsToFilter).length === 0 || !carsToFilter || model === "")
    return carsToFilter;

  let newAvailableCars = {};

  Object.keys(carsToFilter).forEach((key) => {
    let carsList = [];

    carsToFilter[key].forEach((car) => {
      if (model.toLowerCase().trim() === car.model.toLowerCase().trim())
        carsList.push(car);
    });

    if (carsList.length > 0) newAvailableCars[key] = carsList;
  });

  return Object.keys(newAvailableCars).length > 0 ? newAvailableCars : {};
}

function filterByColor(carsToFilter, color) {
  if (Object.keys(carsToFilter).length === 0 || !carsToFilter || color === "")
    return carsToFilter;

  let newAvailableCars = {};

  Object.keys(carsToFilter).forEach((key) => {
    let carsList = [];

    carsToFilter[key].forEach((car) => {
      if (color.toLowerCase() === car.color.toLowerCase()) carsList.push(car);
    });

    if (carsList.length > 0) newAvailableCars[key] = carsList;
  });

  return Object.keys(newAvailableCars).length > 0 ? newAvailableCars : {};
}

function filterByFuel(carsToFilter, fuel) {
  if (Object.keys(carsToFilter).length === 0 || !carsToFilter || fuel === "")
    return carsToFilter;

  let newAvailableCars = {};

  Object.keys(carsToFilter).forEach((key) => {
    let carsList = [];

    carsToFilter[key].forEach((car) => {
      if (fuel.toLowerCase() === car.fuel.toLowerCase()) carsList.push(car);
    });

    if (carsList.length > 0) newAvailableCars[key] = carsList;
  });

  return Object.keys(newAvailableCars).length > 0 ? newAvailableCars : {};
}

export default function filter_Object_of_Cars(carsToFilter, filteringElements) {
  if (
    Object.keys(carsToFilter).length === 0 ||
    Object.keys(filteringElements).length === 0
  ) {
    return carsToFilter;
  }

  const { minPrice, maxPrice, color, fuel, mark, model } = filteringElements;

  let data = filterByPrice(carsToFilter, minPrice, maxPrice);

  if (Object.keys(data).length > 0) {
    if (mark !== "") {
      data = filterByMark(data, mark);
    }

    if (Object.keys(data).length > 0 && model !== "") {
      data = filterByModel(data, model);
    }

    if (Object.keys(data).length > 0 && fuel !== "") {
      data = filterByFuel(data, fuel);
    }

    if (Object.keys(data).length > 0 && color !== "") {
      data = filterByColor(data, color);
    }
  }

  // Return the filtered data or the original if no data matches
  return Object.keys(data).length > 0 ? data : {};
}
