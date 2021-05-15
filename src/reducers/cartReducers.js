import {
  GET_CART_ITEM_LIST_FAIL,
  GET_CART_ITEM_LIST_REQUEST,
  GET_CART_ITEM_LIST_SUCCESS,
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

export const noauthAddCartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
