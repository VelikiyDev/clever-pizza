import {APP_ALERT_HIDE, APP_ALERT_SHOW, APP_REDIRECT, APP_REDIRECT_CLEAR} from "../actions/types";

const initState = {
  isAlert: false,
  redirectTo: '',
  alert: {
    type: 'success',
    message: ''
  }
}

export const appReducer = (state = initState, action) => {
  switch(action.type){
    case APP_ALERT_SHOW:
      return {
        ...state,
        isAlert: true,
        alert: {
          type: action.payload.type || 'success',
          message: action.payload.message || ''
        },
      }
    case APP_ALERT_HIDE:
      return {
        ...state,
        isAlert: false
      }
    case APP_REDIRECT:
      return {
        ...state,
        redirectTo: action.payload
      }
    case APP_REDIRECT_CLEAR:
      return {
        ...state,
        redirectTo: ''
      }
    default: return state
  }
}
