import {PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_FETCH_LIST, PRODUCT_FETCH_ONE, PRODUCT_REMOVE} from "./types"
import {apiAction} from "../middlewares/api";

//Action creators
const fetchProducts = (data) => {
  return {
    type: PRODUCT_FETCH_LIST,
    payload: data
  }
}
const fetchProduct = (data) => {
  return {
    type: PRODUCT_FETCH_ONE,
    payload: data
  }
}

const addProduct = (data) => {
  return {
    type: PRODUCT_ADD,
    payload: {...data}
  }
}

const editProduct = (data) => {
  return {
    type: PRODUCT_ADD,
    payload: {...data}
  }
}

//Methods
export const productFetchList = () => dispatch => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/product/list`,
    method: "GET",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    label: PRODUCT_FETCH_LIST,
    onSuccess: fetchProducts
  })
}

export const productFetchOne = (id) => dispatch => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/product/get/${id}`,
    method: "GET",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    label: PRODUCT_FETCH_LIST,
    onSuccess: fetchProduct
  })
}


export const productAdd = (data) => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/product/add`,
    method: "POST",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: data,
    label: PRODUCT_ADD,
    onSuccess: addProduct
  })
}
export const productEdit = (data) => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/product/edit`,
    method: "POST",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: data,
    label: PRODUCT_EDIT,
    onSuccess: editProduct
  })
}

export const productRemove = (data) => {
  return apiAction({
    url: `https://clever-pizza.herokuapp.com/api/product/remove`,
    method: "POST",
    headersOverride: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: data,
    label: PRODUCT_REMOVE,
    onSuccess: fetchProducts,
  })
}

