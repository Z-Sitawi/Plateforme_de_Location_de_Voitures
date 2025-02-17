import { createSlice } from "@reduxjs/toolkit";

const toValidType = (data) => {
  if (data) return JSON.parse(data);
  else false;
};

const getAllEmails = () => {
  let users = toValidType(localStorage.getItem("usersList"));
  let emails = [];
  if (users) emails = users.map((u) => u.email);
  return emails;
};

const getID = () => {
  // return the id of the loged in user
  let logedinUser = toValidType(localStorage.getItem("logedinUser")) || false;
  return logedinUser ? logedinUser.id : "x";
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usersList: toValidType(localStorage.getItem("usersList")),
    usersId: toValidType(localStorage.getItem("usersId")),
    emails: getAllEmails(),
    logedinUser: toValidType(localStorage.getItem("logedinUser")) || false,
    logedinUserCars: toValidType(localStorage.getItem("logedinUserCars")) || [],
    availableCars: toValidType(localStorage.getItem("availableCars")) || {},
  },
  reducers: {
    login: (state, action) => {
      // set Loged in user
      localStorage.setItem("logedinUser", JSON.stringify(action.payload));
      state.logedinUser = action.payload;

      // Set Loged in user cars
      state.logedinUserCars =
        toValidType(localStorage.getItem("cars"))[state.logedinUser.id] || [];
      localStorage.setItem(
        "logedinUserCars",
        JSON.stringify(state.logedinUserCars)
      );

      // Set available cars to get rented
      let allCars = toValidType(localStorage.getItem("cars")) || {};
      if (allCars != {}) {
        delete allCars[state.logedinUser.id];
        state.availableCars = allCars;
        localStorage.setItem(
          "availableCars",
          JSON.stringify(state.availableCars)
        );
      }
    },
    logout: (state) => {
      localStorage.removeItem("logedinUser");
      state.logedinUser = false;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      const users = state.usersList ? [...state.usersList, newUser] : [newUser];
      localStorage.setItem("usersList", JSON.stringify(users));
      localStorage.setItem("usersId", JSON.stringify(state.usersId + 1));
      state.usersList = users;
      state.emails = getAllEmails();
      state.usersId += 1;
    },

    addCar: (state, action) => {
      let carToAdd = { ...action.payload, rented: false, rentedTo: false };
      const ownerId = state.logedinUser.id;
      const cars = toValidType(localStorage.getItem("cars"));
      let carsList = cars[ownerId];

      if (carsList && carsList.length > 0) {
        carsList.push({ id: carsList.at(-1).id + 1, ...carToAdd });
        cars[ownerId] = state.logedinUserCars = carsList;
        localStorage.setItem("cars", JSON.stringify(cars));
      } else {
        cars[ownerId] = state.logedinUserCars = [{ id: 0, ...carToAdd }];
        localStorage.setItem("cars", JSON.stringify(cars));
      }
    },
    delCar: (state, action) => {
      const ownerId = state.logedinUser.id;
      let allCars = toValidType(localStorage.getItem("cars"));
      let carsList = allCars[ownerId];
      let newCarsList = carsList.filter((car) => car.id != action.payload);
      allCars[ownerId] = newCarsList;
      localStorage.setItem("cars", JSON.stringify(allCars));
      state.logedinUserCars = newCarsList;
    },
    makeRequest: (state, action) => {
      const {
        clientId,
        ownerId,
        carId,
        pickupDate,
        returnDate,
        totalPrice,
        phoneNumber,
      } = action.payload;

      const clientRequest = {
        confirmed: false,
        refused: false,
        expired: false,
        pickupDate,
        returnDate,
        totalPrice,
        carId,
        ownerId,
        clientId,
      };

      const ownerRequest = {
        confirmed: false,
        refused: false,
        expired: false,
        pickupDate,
        returnDate,
        totalPrice,
        phoneNumber,
        carId,
        ownerId,
        clientId,
      };

      const keys = {
        admin: "adminRequests-" + ownerId,
        user: `userRequests-${clientId}`,
        requests: `request-${clientId}-${ownerId}-${carId}`,
      };

      // Saving Request
      if (toValidType(localStorage.getItem(keys.requests))) {
        alert(
          "Vous ne pouvez pas faire plus d'une réservation pour le même véhicule."
        );
        return;
      } else {
        // Save For Owner
        if (toValidType(localStorage.getItem(keys.admin))) {
          let data = toValidType(localStorage.getItem(keys.admin));
          let newData = data.push(ownerRequest);
          localStorage.setItem(keys.admin, JSON.stringify(newData));
        } else {
          localStorage.setItem(keys.admin, JSON.stringify([ownerRequest]));
        }

        // Save For Users
        if (toValidType(localStorage.getItem(keys.user))) {
          let data = toValidType(localStorage.getItem(keys.user));
          let newData = [...data, clientRequest];
          localStorage.setItem(keys.user, JSON.stringify(newData));
        } else {
          localStorage.setItem(keys.user, JSON.stringify([clientRequest]));
        }
        localStorage.setItem(keys.requests, JSON.stringify(true));
        alert("Demande envoyée avec succès");
      }
    },
  },
});

const viewSlice = createSlice({
  name: "view",
  initialState: {
    componentToShow: JSON.parse(localStorage.getItem("componentToShow")) || 0,
    componentToShow2: JSON.parse(localStorage.getItem("componentToShow2")) || 0,
    userRequests:
      toValidType(localStorage.getItem("userRequests-" + getID())) || [],
  },
  reducers: {
    changeComponent: (state, action) => {
      if (action.payload.type === "admin") {
        state.componentToShow = action.payload.id;
        localStorage.setItem(
          "componentToShow",
          JSON.stringify(action.payload.id)
        );
      } else {
        state.componentToShow2 = action.payload.id;
        localStorage.setItem(
          "componentToShow2",
          JSON.stringify(action.payload.id)
        );
      }
    },
    getRequests: (state, action) => {
      if (action.payload === "user") {
        state.userRequests = toValidType(
          localStorage.getItem("userRequests-" + getID())
        );
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout, addUser, addCar, delCar, makeRequest } =
  authSlice.actions;

export const viewReducer = viewSlice.reducer;
export const { changeComponent, getRequests } = viewSlice.actions;
