import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export function fetchProducts() {
  return async function (dispatch) {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/v1/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  };
}
