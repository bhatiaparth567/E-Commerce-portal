import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./actionTypes";

export function addItemToCart(id, qty) {
  return async function (dispatch, getState) {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
}
export function removeItemFromCart(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        product: id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: data.qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
}
