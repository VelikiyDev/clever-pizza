import {API_TYPES} from "./api";
import {alertShow, appRedirect} from "../actions/app.actions";
import {PRODUCT_ADD, PRODUCT_EDIT, USER_LOGIN} from "../actions/types";
export const appMiddleware = ({ dispatch }) => next => action => {
  next(action)

  if ([API_TYPES.API_ERROR].includes(action.type)) {
    const message = action.payload.messages.join('\n')
    dispatch(alertShow({ message: message, type: 'error' }))
  }

  if ([PRODUCT_ADD, PRODUCT_EDIT].includes(action.type)) {
    dispatch(alertShow({ message: action.payload.message, type: 'success' }))
  }
  if ([USER_LOGIN].includes(action.type)) {
    dispatch(appRedirect({redirectTo: action.payload.from}))
  }
}