import {combineReducers} from "redux";
import {productsReducer} from "./products.reducer";
import {userReducer} from "./user.reducer";
import {apiReducer} from "../middlewares/api";
import {appReducer} from "./app.reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  api: apiReducer,
  app: appReducer
})