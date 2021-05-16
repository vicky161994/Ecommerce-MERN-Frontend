import {
  GET_CART_ITEM_LIST_FAIL,
  GET_CART_ITEM_LIST_REQUEST,
  GET_CART_ITEM_LIST_SUCCESS,
  NO_AUTH_ADD_CART_FAIL,
  NO_AUTH_ADD_CART_REQUEST,
  NO_AUTH_ADD_CART_SUCCESS,
  NO_AUTH_DELETE_CART_SUCCESS,
  NO_AUTH_QTY_CHANGED_SUCCESS,
} from "../constants/cartConstants";

export const cartListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case GET_CART_ITEM_LIST_REQUEST:
      return { loading: true };
    case GET_CART_ITEM_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case GET_CART_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const noAuthAddToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case NO_AUTH_ADD_CART_REQUEST:
      return { loading: true };
    case NO_AUTH_ADD_CART_SUCCESS:
      return { loading: false, cartList: action.payload };
    case NO_AUTH_DELETE_CART_SUCCESS:
      return { loading: false, cartList: action.payload };
    case NO_AUTH_QTY_CHANGED_SUCCESS:
      return { loading: false, cartList: action.payload };
    case NO_AUTH_ADD_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
