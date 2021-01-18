import {types} from "./api.types"

const initState = {
  isFetchingData: false
}

const apiReducer = (state = initState, action) => {
  switch (action.type) {
    case types.API_START:
      return {
        ...state,
        isFetchingData: true
      }
    case types.API_END:
      return {
        ...state,
        isFetchingData: false
      }
    case types.ACCESS_DENIED:
      return {
        ...state,
        isFetchingData: false,
        redirectTo: action.payload
      }
    default:
      return state
  }
}
export {apiReducer}