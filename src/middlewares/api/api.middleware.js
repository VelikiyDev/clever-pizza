import axios from "axios"
import { types } from "./api.types"
import { accessDenied, apiError, apiStart, apiEnd } from "./api.actions"

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action)

  if (action.type !== types.API) return

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headersOverride
  } = action.payload

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data"

  axios.defaults.headers.common["Content-Type"] = "application/json"
  if (accessToken !== null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }

  if (label) {
    dispatch(apiStart(label))
  }
  axios
    .request({
      url,
      method,
      headers: headersOverride,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      if (typeof onSuccess() === 'object') {
        dispatch(onSuccess(data))
      } else {
        onSuccess(data)
      }
    })
    .catch(error => {
      dispatch(apiError(error.response.data))
      if (typeof onFailure() === 'object') {
        dispatch(onFailure(error.response.data))
      } else {
        onFailure(error)
      }

      if (error.response && error.response.status === 401) {
        dispatch(accessDenied(window.location.pathname))
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label))
      }
    })
}

export default apiMiddleware