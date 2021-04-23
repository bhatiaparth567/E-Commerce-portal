import { combineReducers } from "redux";
import { productsList, productDetails } from "./products";
import { cartReducer } from "./cart";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./users";
import { orderCreateReducer } from "./order";

export default combineReducers({
  productsList,
  productDetails,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});
