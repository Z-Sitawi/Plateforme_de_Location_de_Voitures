const toJS = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const getReservationDates = () => {
  let todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let day = todayDate.getDate();

  // Set the pickupDate to today's date
  let pickupDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  // Increment todayDate to get tomorrow's date
  todayDate.setDate(todayDate.getDate() + 1);

  // Set minReturnDate to tomorrow's date
  let minReturnDate = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1 < 10
      ? "0" + (todayDate.getMonth() + 1)
      : todayDate.getMonth() + 1
  }-${
    todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate()
  }`;

  return { pickupDate, minReturnDate };
};

const getData = (key) => {
  let data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  else return false;
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

function Global_Refuse_Request(state, action, idOfTheCar = false) {
  const { ownerId, clientId } = action.payload;
  const carId = !idOfTheCar ? action.payload.carId : idOfTheCar;

  const keys = {
    admin: "adminRequests-" + ownerId,
    user: `userRequests-${clientId}`,
    requests: `request-${clientId}-${ownerId}-${carId}`,
  };

  // For Owner
  const adminRequests = [...toJS(state.adminRequests)];
  const targetRequestAdmin = adminRequests.findIndex(
    (req) =>
      Number(req.carId) === Number(carId) &&
      Number(req.clientId) === Number(clientId)
  );
  adminRequests[targetRequestAdmin].refused = true;
  setData(keys.admin, adminRequests);

  // For Client
  const userRequests = getData("userRequests-" + clientId);
  const targetRequestClient = userRequests.findIndex(
    (req) =>
      Number(req.carId) === Number(carId) &&
      Number(req.clientId) === Number(clientId) &&
      Number(req.ownerId) === Number(ownerId)
  );
  userRequests[targetRequestClient].refused = true;
  setData(keys.user, userRequests);

  // Alow users to request the refused car again.
  removeItem(keys.requests);
}

function Global_Accept_Request(state, action) {
  const { carId, ownerId, clientId } = action.payload;
  const keys = {
    admin: "adminRequests-" + ownerId,
    user: `userRequests-${clientId}`,
    requests: `request-${clientId}-${ownerId}-${carId}`,
  };

  // For Owner
  const adminRequests = [...toJS(state.adminRequests)];
  const targetRequestAdmin = adminRequests.findIndex(
    (req) =>
      Number(req.carId) === Number(carId) &&
      Number(req.clientId) === Number(clientId)
  );

  if (targetRequestAdmin !== -1) {
    adminRequests[targetRequestAdmin].confirmed = true;
  }
  setData(keys.admin, adminRequests);

  // For Client
  const userRequests = getData("userRequests-" + clientId);
  const targetRequestClient = userRequests.findIndex(
    (req) =>
      Number(req.carId) === Number(carId) &&
      Number(req.clientId) === Number(clientId) &&
      Number(req.ownerId) === Number(ownerId)
  );
  if (targetRequestClient !== -1) {
    userRequests[targetRequestClient].confirmed = true;
  }
  setData(keys.user, userRequests);

  // Automatically refuse requests with the same car id for owner and clients

  adminRequests.forEach((request) => {
    if (Number(request.carId) === Number(carId) && !request.confirmed) {
      request.refused = true;

      // for clients
      let userRequests = getData("userRequests-" + request.clientId);
      let targetRequest = userRequests.findIndex(
        (req) => req.carId === carId && !req.confirmed
      );
      userRequests[targetRequest].refused = true;
      setData("userRequests-" + request.clientId, userRequests);
      removeItem(`request-${request.clientId}-${ownerId}-${carId}`);
    }
  });
  setData(keys.admin, adminRequests);

  // Mark the target car as rented and set to whom it's rented
  rented(ownerId, carId, clientId);
}

const getAllEmails = () => {
  let users = getData("usersList");
  let emails = [];
  if (users) emails = users.map((u) => u.email);
  return emails;
};

const getID = () => {
  // return the id of the loged in user
  let logedinUser = getData("logedinUser") || false;
  return logedinUser ? logedinUser.id : "x";
};

function rented(ownerId, carId, clientId) {
  const allcars = getData("cars");
  const logedinUserCars = allcars[ownerId];
  const carIndex = logedinUserCars.findIndex(
    (car) => Number(car.id) === Number(carId)
  );
  logedinUserCars[carIndex].rented = true;
  logedinUserCars[carIndex].rentedTo = clientId;
  allcars[ownerId] = logedinUserCars;
  setData("cars", allcars);
}

export {
  getID,
  getAllEmails,
  Global_Accept_Request,
  Global_Refuse_Request,
  toJS,
  getData,
  setData,
  getReservationDates,
  removeItem,
};
