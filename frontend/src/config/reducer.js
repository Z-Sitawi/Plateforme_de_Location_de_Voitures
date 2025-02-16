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
  },
});

const viewSlice = createSlice({
  name: "view",
  initialState: {
    componentToShow: 0,
  },
  reducers: {
    changeComponent: (state, action) => {
      state.componentToShow = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout, addUser } = authSlice.actions;

export const viewReducer = viewSlice.reducer;
export const { changeComponent } = viewSlice.actions;
