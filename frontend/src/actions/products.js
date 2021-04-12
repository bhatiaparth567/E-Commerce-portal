import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export function fetchProducts() {
  return async function (dispatch) {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}

export function fetchProduct(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}
