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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usersList: toValidType(localStorage.getItem("usersList")),
    usersId: toValidType(localStorage.getItem("usersId")),
    emails: getAllEmails(),
    logedinUser: toValidType(localStorage.getItem("logedinUser")) || false,
    logedinUserCars:
      toValidType(localStorage.getItem("cars"))[
        toValidType(localStorage.getItem("logedinUser")).id
      ] || false,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("logedinUser", JSON.stringify(action.payload));
      state.logedinUser = action.payload;
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
  },
});

const viewSlice = createSlice({
  name: "view",
  initialState: {
    componentToShow: JSON.parse(localStorage.getItem("componentToShow")) || 0,
    componentToShow2: JSON.parse(localStorage.getItem("componentToShow2")) || 0,
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
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout, addUser, addCar, delCar } = authSlice.actions;

export const viewReducer = viewSlice.reducer;
export const { changeComponent } = viewSlice.actions;
