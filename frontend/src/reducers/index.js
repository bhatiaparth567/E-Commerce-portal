import { combineReducers } from "redux";
import { productsList, productDetails } from "./products";
import { cartReducer } from "./cart";

export default combineReducers({
  productsList,
  productDetails,
  cart: cartReducer,
});
