import { LOGIN } from "./actions";

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

const iniState = {
  usersList: toValidType(localStorage.getItem("usersList")),
  usersId: toValidType(localStorage.getItem("usersId")),
  emails: getAllEmails(),
  logedinUser: toValidType(localStorage.getItem("logedinUser")) || false,
};

export default function reducer(state = iniState, action) {
  switch (action.type) {
    case LOGIN:
      return (state = {
        ...state,
        logedinUser: action.payload,
      });
    default:
      return state;
  }
}
