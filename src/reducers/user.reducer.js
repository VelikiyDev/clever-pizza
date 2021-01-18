import {USER_LOGOUT, USER_LOGIN} from "../actions/types";

const initState = {
  loggedIn: false,
  user: {}
}

export const userReducer = (state = initState, action) => {
  switch(action.type){
    case USER_LOGIN:
      localStorage.setItem("token", action.payload.user.token)
      return {
        loggedIn: true,
        user: {...action.payload.user}
      }
    case USER_LOGOUT:
      localStorage.clear()
      return {
        loggedIn: false,
        user: {}
      }
    default: return state
  }
}
