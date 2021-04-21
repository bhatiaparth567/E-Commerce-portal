import { combineReducers } from "redux";
import { productsList, productDetails } from "./products";
import { cartReducer } from "./cart";
import { userLoginReducer, userRegisterReducer } from "./users";

export default combineReducers({
  productsList,
  productDetails,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
