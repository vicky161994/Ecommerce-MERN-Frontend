import {
  DELETE_ITEM_FROM_CART_SUCCESS,
  MANAGE_ITEM_QTY_SUCCESS,
} from "../constants/cartConstants";
import { CLEAR_USER_CARTITEM_SUCCESS } from "../constants/orderConstants";
import {
  ADD_ADDRESS_SUCCESS,
  ADD_CART_SUCCESS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  CHANGE_PROFILE_FAIL,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  EDIT_ADDRESS_FAIL,
  EDIT_ADDRESS_REQUEST,
  EDIT_ADDRESS_SUCCESS,
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
    case CLEAR_USER_CARTITEM_SUCCESS:
      return { loading: false, user: action.payload };
    case ADD_ADDRESS_SUCCESS:
      return { loading: false, user: action.payload };
    case DELETE_ADDRESS_SUCCESS:
      return { loading: false, user: action.payload };
    case EDIT_ADDRESS_SUCCESS:
      return { loading: false, user: action.payload };
    case CHANGE_PROFILE_SUCCESS:
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

export const deleteAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
      return { loading: true };
    case DELETE_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ADDRESS_REQUEST:
      return { loading: true };
    case EDIT_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_REQUEST:
      return { loading: true };
    case CHANGE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
