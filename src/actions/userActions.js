import Axios from "axios";
import { NOAUTH_ADD_CART_ITEM_LIST_SUCCESS } from "../constants/cartConstants";
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
  ADD_CART_REQUEST,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
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

export const addToCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: ADD_CART_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    if (user) {
      let data;
      if (user.cartItems) {
        if (user.cartItems.some((cart) => cart.productId === productId)) {
          const index = user.cartItems.findIndex(
            (cart) => cart.productId === productId
          );
          user.cartItems[index].qty = user.cartItems[index].qty + 1;
        } else {
          data = { productId, qty: 1 };
          user.cartItems.push(data);
        }
      } else {
        user.cartItems = [];
        data = { productId, qty: 1 };
        user.cartItems.push(data);
      }
      const response = await Axios.post(
        "/api/users/add-to-cart",
        {
          cartItems: user.cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
      dispatch({ type: ADD_CART_SUCCESS, payload: user });
    } else {
      const cartItems = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
      const {
        cartList: { products },
      } = getState();
      if (cartItems) {
        if (cartItems.some((cart) => cart.productId === productId)) {
          const index = cartItems.findIndex(
            (cart) => cart.productId === productId
          );
          cartItems[index].qty = cartItems[index].qty + 1;
          // if (products.data.some((cart) => cart.cartList._id === productId)) {
          //   const index = products.data.findIndex(
          //     (cart) => cart.cartList._id === productId
          //   );
          //   products.data[index].qty = products.data[index].qty + 1;
          // }
        } else {
          let data = { productId, qty: 1 };
          cartItems.push(data);
          // products.data.push(data);
        }
        localStorage.setItem(
          "thevickyk.com-cartItems",
          JSON.stringify(cartItems)
        );
      } else {
        let cartItems = [];
        let data = { productId, qty: 1 };
        cartItems.push(data);
        localStorage.setItem(
          "thevickyk.com-cartItems",
          JSON.stringify(cartItems)
        );
        // products.data.push(data);
      }
      // dispatch({ type: NOAUTH_ADD_CART_ITEM_LIST_SUCCESS, payload: products });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_CART_FAIL, error: error.response.data.message });
  }
};
