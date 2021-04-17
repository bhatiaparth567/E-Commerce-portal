import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/actionTypes";

const initialCartState = {
  cartItems: [],
};
export const cartReducer = function (state = initialCartState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemExists.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      let cartItems = [...state.cartItems];
      const index = cartItems.filter(
        (item) => item.product === action.payload.product
      );
      if (index !== -1) {
        cartItems.splice(index, 1);

        return {
          ...state,
          cartItems,
        };
      }
      break;
    default:
      return state;
  }
};
