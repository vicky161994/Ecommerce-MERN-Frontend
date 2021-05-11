import Axios from "axios";
import {
  ADD_WISHLIST_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_SUCCESS,
} from "../constants/userConstants";

export const register = (name, email, password, number) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password, number },
  });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      number,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      error: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/login", {
      email,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("thevickyk.com-userInfo");
  // localStorage.removeItem("cartItems");
  // localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_LOGOUT });
};

export const addWishlist = (productId) => async (dispatch, getState) => {
  dispatch({ type: ADD_WISHLIST_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.post(
      "/api/users/add-wishlist",
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data.status === 201) {
      if (user.wishlist.includes(productId)) {
        let index = user.wishlist.indexOf(productId);
        if (index > -1) {
          user.wishlist.splice(index, 1);
        }
      } else {
        user.wishlist.push(productId);
      }
    }
    localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
    dispatch({ type: ADD_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_WISHLIST_FAIL, payload: error.message });
  }
};
