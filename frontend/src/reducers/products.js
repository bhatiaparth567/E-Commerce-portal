import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../actions/actionTypes";

const initialProductsListState = {
  products: [],
};
export function productsList(state = initialProductsListState, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
const initialProductsDetailsState = {
  product: {
    reviews: [],
  },
};
export function productDetails(state = initialProductsDetailsState, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
