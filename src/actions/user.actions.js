import {USER_LOGIN, USER_LOGOUT} from "./types"
import {apiAction} from "../middlewares/api";

//Action creators
const loginUser = (data) => {
  return {
    type: USER_LOGIN,
    payload: {...data}
  }
}

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  }
}

//Methods
export const fetchUser = (data) => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/auth/login`,
    method: "POST",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: data,
    label: USER_LOGIN,
    onSuccess: loginUser
  })
}

export const autoLogin = (loc) => {
  console.log(loc)
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/auth/auto-login`,
    method: "GET",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: {from: loc},
    label: USER_LOGIN,
    onSuccess: loginUser
  })
}
