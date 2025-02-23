import { createSlice } from "@reduxjs/toolkit";
import filter_Object_of_Cars from "../assets/filteringFunc";
import {
  getData,
  setData,
  getAllEmails,
  getID,
  Global_Accept_Request,
  Global_Refuse_Request,
  removeItem,
  toJS,
} from "../assets/myFunctions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usersList: getData("usersList"),
    usersId: getData("usersId"),
    emails: getAllEmails(),
    logedinUser: getData("logedinUser") || false,
    logedinUserCars: getData("logedinUserCars") || [],
    availableCars: getData("availableCars") || {},
    userRequests: getData("userRequests-" + getID()) || [],
    adminRequests: getData("adminRequests-" + getID()) || [],
    TTR: getData("TTR") || 0,
  },
  reducers: {
    login: (state, action) => {
      // set Loged in user
      setData("logedinUser", action.payload);
      state.logedinUser = action.payload;

      // Set Loged in user cars
      state.logedinUserCars = getData("cars")[state.logedinUser.id] || [];
      setData("logedinUserCars", state.logedinUserCars);

      // Set available cars to get rented
      let allCars = getData("cars") || {};
      if (allCars != {}) {
        delete allCars[state.logedinUser.id];
        state.availableCars = allCars;
        setData("availableCars", state.availableCars);
      }
    },
    logout: (state) => {
      removeItem("logedinUser");
      removeItem("logedinUserCars");
      removeItem("availableCars");
      state.logedinUser = false;
      state.logedinUserCars = [];
      state.availableCars = {};
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      const users = state.usersList ? [...state.usersList, newUser] : [newUser];
      setData("usersList", users);
      setData("usersId", state.usersId + 1);
      state.usersList = users;
      state.emails = getAllEmails();
      state.usersId += 1;
    },

    addCar: (state, action) => {
      let carToAdd = { ...action.payload, rented: false, rentedTo: false };
      const ownerId = state.logedinUser.id;
      const cars = getData("cars");
      let carsList = cars[ownerId];

      if (carsList && carsList.length > 0) {
        carsList.push({ id: carsList.at(-1).id + 1, ...carToAdd });
        cars[ownerId] = state.logedinUserCars = carsList;
        setData("cars", cars);
      } else {
        cars[ownerId] = state.logedinUserCars = [{ id: 0, ...carToAdd }];
        setData("cars", cars);
      }
      alert("Véhicule ajouté avec succès");
    },
    delCar: (state, action) => {
      const carId = action.payload;
      const ownerId = toJS(state.logedinUser.id);
      let allCars = getData("cars");
      let carsList = allCars[ownerId];

      let targetCar = carsList.findIndex(
        (car) => Number(car.id) === Number(carId)
      );
      if (!carsList[targetCar].rented) {
        carsList.splice(targetCar, 1);
        setData("cars", allCars);
        setData("logedinUserCars", carsList);
        state.logedinUserCars = carsList;
      } else {
        alert("Ce véhicule ne peut pas être supprimé tant qu'il est loué.");
      }
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
      if (getData(keys.requests)) {
        alert(
          "Vous ne pouvez pas faire plus d'une réservation pour le même véhicule."
        );
        return;
      } else {
        // Save For Owner
        if (getData(keys.admin)) {
          let data = getData(keys.admin);
          let newData = [...data, ownerRequest];
          setData(keys.admin, newData);
        } else {
          setData(keys.admin, [ownerRequest]);
        }

        // Save For Users
        if (getData(keys.user)) {
          let data = getData(keys.user);
          let newData = [...data, clientRequest];
          setData(keys.user, newData);
        } else {
          setData(keys.user, [clientRequest]);
        }
        setData(keys.requests, true);
        alert("Demande envoyée avec succès");
      }
    },
    getRequests: (state, action) => {
      if (action.payload === "user") {
        state.userRequests = getData("userRequests-" + getID());
      } else {
        state.adminRequests = getData("adminRequests-" + getID());
      }
    },
    refuseRequest: (state, action) => {
      const confirmation = window.confirm(
        "Etes-vous sûr de vouloir refuser cette demande ?"
      );
      if (confirmation) {
        Global_Refuse_Request(state, action);
      }
    },
    acceptRequest: (state, action) => {
      const confirmation = window.confirm(
        "Etes-vous sûr de vouloir accepté cette demande ?"
      );
      if (confirmation) {
        Global_Accept_Request(state, action);
        state.logedinUserCars = getData("cars")[action.payload.ownerId];

        // Calculate Total Rvenue
      }
    },
    deleteRequest: (state, action) => {
      const { type, carId, ownerId, clientId } = action.payload;
      const keys = {
        admin: "adminRequests-" + ownerId,
        user: `userRequests-${clientId}`,
      };

      const requests =
        type === "user" ? toJS(state.userRequests) : toJS(state.adminRequests);

      const requestIndex = requests.findIndex(
        (req) =>
          Number(req.carId) === Number(carId) &&
          Number(req.ownerId) !== Number(ownerId) &&
          Number(req.clientId) === Number(clientId)
      );
      requests.splice(requestIndex, 1);

      if (type === "user") {
        state.userRequests = requests;
        setData(keys.user, requests);
      } else {
        state.adminRequests = requests;
        setData(keys.admin, requests);
      }
    },
    calculatTTR: (state) => {
      const reqests = state.adminRequests;
      if (reqests && reqests.length > 0) {
        const TTR = reqests.reduce((sum, req) => {
          return req.confirmed ? sum + Number(req.totalPrice) : sum + 0;
        }, 0);
        setData("TTR", TTR);
        state.TTR = TTR;
      }
    },
    filterCars: (state, action) => {
      let carsToFilter = getData("availableCars");
      let cars = filter_Object_of_Cars(carsToFilter, action.payload);
      state.availableCars = cars;
    },
  },
});

const viewSlice = createSlice({
  name: "view",
  initialState: {
    componentToShow: getData("componentToShow") || 0,
    componentToShow2: getData("componentToShow2") || 0,
  },
  reducers: {
    changeComponent: (state, action) => {
      if (!action.payload.type) {
        setData("componentToShow2", 0);
        setData("componentToShow", 0);
        state.componentToShow = getData("componentToShow");
        state.componentToShow2 = getData("componentToShow2");
      } else if (action.payload.type === "admin") {
        state.componentToShow = action.payload.id;
        setData("componentToShow", action.payload.id);
      } else {
        state.componentToShow2 = action.payload.id;
        setData("componentToShow2", action.payload.id);
      }
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    elements: {
      minPrice: 0,
      maxPrice: 1000,
      color: "",
      fuel: "",
      mark: "",
      model: "",
    },
  },
  reducers: {
    setMinPrice: (state, action) => {
      state.elements.minPrice = Number(action.payload);
    },
    setMaxPrice: (state, action) => {
      state.elements.maxPrice = Number(action.payload);
    },
    setFuelOrColor: (state, action) => {
      const { name, value } = action.payload;
      name === "fuel"
        ? (state.elements.fuel = value)
        : (state.elements.color = value);
    },
    setMarkOrModel: (state, action) => {
      const inputValue = action.payload;

      if (inputValue === "") {
        state.elements.mark = "";
        state.elements.model = "";
      } else {
        let value = inputValue.split(",");

        if (value[0]) state.elements.mark = value[0];
        if (value[1]) state.elements.model = value[1];
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  login,
  logout,
  addUser,
  addCar,
  delCar,
  makeRequest,
  refuseRequest,
  acceptRequest,
  getRequests,
  deleteRequest,
  calculatTTR,
  filterCars,
} = authSlice.actions;

export const viewReducer = viewSlice.reducer;
export const { changeComponent } = viewSlice.actions;

export const filterReducer = filterSlice.reducer;
export const { setMaxPrice, setMinPrice, setFuelOrColor, setMarkOrModel } =
  filterSlice.actions;
