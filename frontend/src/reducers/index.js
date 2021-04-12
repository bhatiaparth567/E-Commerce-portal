import { combineReducers } from "redux";
import { productsList, productDetails } from "./products";

export default combineReducers({
  productsList,
  productDetails,
});
