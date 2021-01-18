import {
  PRODUCT_ADD,
  PRODUCT_EDIT,
  PRODUCT_FETCH_LIST,
  PRODUCT_FETCH_ONE
} from "../actions/types";

const initState = {
  list: [],
  fetchedProduct: {
    name: '',
    image: '',
    description: '',
    price: '',
    discount: '',
    discountTo: '',
  }
}


export const productsReducer = (state = initState, action) => {
  switch(action.type){
    case PRODUCT_FETCH_LIST:
      return {
        ...state,
        list: action.payload,
      }
    case PRODUCT_FETCH_ONE:
      return {
        ...state,
        fetchedProduct: action.payload,
      }
    case PRODUCT_ADD:
      return {
        ...state,
        list: [...state.list, action.payload.product],
      }
    case PRODUCT_EDIT:
      return {
        ...state,
        list: [...action.payload],
      }
    default: return state
  }
}