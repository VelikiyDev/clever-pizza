import {types} from "./api.types";

// Action creators
export const apiStart = label => ({
  type: types.API_START,
  payload: {
    label
  }
});

export const apiEnd = label => ({
  type: types.API_END,
  payload: {
    label
  }
});

export const accessDenied = url => ({
  type: types.ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: types.API_ERROR,
  payload: error
})


// Methods

export function apiAction({
   url = "",
   method = "GET",
   data = null,
   accessToken = null,
   onSuccess = () => {},
   onFailure = () => {},
   label = "",
   headersOverride = null
  }) {
  return {
    type: types.API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}