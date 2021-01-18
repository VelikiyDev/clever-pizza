import {
  APP_ALERT_HIDE,
  APP_ALERT_SHOW,
  APP_REDIRECT,
  APP_REDIRECT_CLEAR
} from "./types";

//action creators
const showAlert = ({message, type}) => {
  return {
    type: APP_ALERT_SHOW,
    payload: {
      message,
      type
    }
  }
}

const hideAlert = () => {
  return {
    type: APP_ALERT_HIDE,
  }
}

const redirect = (redirectTo) => {
  return {
    type: APP_REDIRECT,
    payload: redirectTo
  }
}

const redirectClear = () => {
  return {
    type: APP_REDIRECT_CLEAR,
  }
}

//methods
export const alertShow = (data) => {
  return dispatch => {
    dispatch(showAlert(data))
  }
}

export const alertHide = () => {
  return dispatch => {
    dispatch(hideAlert())
  }
}

export const appRedirect = ({redirectTo}) => {
  return dispatch => {
    dispatch(redirect(redirectTo))
    dispatch(redirectClear())
  }
}



