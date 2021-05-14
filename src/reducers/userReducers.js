import {
  DELETE_ITEM_FROM_CART_SUCCESS,
  MANAGE_ITEM_QTY_SUCCESS,
} from "../constants/cartConstants";
import {
  ADD_CART_SUCCESS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADD_CART_SUCCESS:
      return { loading: false, user: action.payload };
    case DELETE_ITEM_FROM_CART_SUCCESS:
      return { loading: false, user: action.payload };
    case MANAGE_ITEM_QTY_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
      return { loading: true };
    case ADD_WISHLIST_SUCCESS:
      return { loading: false, wishlist: action.payload };
    case ADD_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
