import Axios from "axios";
import {
  DELETE_ITEM_FROM_CART_FAIL,
  DELETE_ITEM_FROM_CART_REQUEST,
  DELETE_ITEM_FROM_CART_SUCCESS,
  GET_CART_ITEM_LIST_FAIL,
  GET_CART_ITEM_LIST_REQUEST,
  GET_CART_ITEM_LIST_SUCCESS,
  MANAGE_ITEM_QTY_FAIL,
  MANAGE_ITEM_QTY_REQUEST,
  MANAGE_ITEM_QTY_SUCCESS,
  NOAUTH_ADD_CART_ITEM_LIST_REQUEST,
  NOAUTH_ADD_CART_ITEM_LIST_SUCCESS,
  NOAUTH_ADD_CART_ITEM_LIST_FAIL,
} from "../constants/cartConstants";

export const getcartItemList = () => async (dispatch, getState) => {
  dispatch({ type: GET_CART_ITEM_LIST_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    if (user) {
      const { data } = await Axios.get("/api/carts/get-cart-item-list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({
        type: GET_CART_ITEM_LIST_SUCCESS,
        payload: data,
      });
    } else {
      const cartItems = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
      const { data } = await Axios.post(
        "/api/carts/unauth-get-cart-item-list",
        {
          cartItems,
        }
      );
      dispatch({
        type: GET_CART_ITEM_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CART_ITEM_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteItemFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_ITEM_FROM_CART_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    if (!user) {
      const {
        cartList: { products },
      } = getState();
      const temp = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
      const index = temp.findIndex((cart) => cart.productId === productId);
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (products.data.some((cart) => cart.cartList._id === productId)) {
        const index = products.data.findIndex(
          (cart) => cart.cartList._id === productId
        );
        products.data.splice(index, 1);
      }
      localStorage.setItem("thevickyk.com-cartItems", JSON.stringify(temp));
      dispatch({ type: NOAUTH_ADD_CART_ITEM_LIST_SUCCESS, payload: products });
    } else {
      const { data } = await Axios.post(
        "/api/carts/delete-item-from-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.status === 200) {
        if (user.cartItems.some((cart) => cart.productId === productId)) {
          const index = user.cartItems.findIndex(
            (cart) => cart.productId === productId
          );
          if (index > -1) {
            user.cartItems.splice(index, 1);
          }
        }
        localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
        dispatch({ type: DELETE_ITEM_FROM_CART_SUCCESS, payload: user });
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ITEM_FROM_CART_FAIL,
      error: error.message,
    });
  }
};

export const manageItemQty = (productId, qty) => async (dispatch, getState) => {
  dispatch({ type: MANAGE_ITEM_QTY_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    if (!user) {
      const {
        cartList: { products },
      } = getState();
      const temp = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
      if (products.data.some((cart) => cart.cartList._id === productId)) {
        const index = products.data.findIndex(
          (cart) => cart.cartList._id === productId
        );
        temp[index].qty = qty;
        products.data[index].qty = qty;
        localStorage.setItem("thevickyk.com-cartItems", JSON.stringify(temp));
      }
    } else {
      const { data } = await Axios.post(
        "/api/carts/manage-item-qty",
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.status === 200) {
        if (user.cartItems.some((cart) => cart.productId === productId)) {
          const index = user.cartItems.findIndex(
            (cart) => cart.productId === productId
          );
          user.cartItems[index].qty = qty;
          localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
          dispatch({ type: MANAGE_ITEM_QTY_SUCCESS, payload: user });
        }
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: MANAGE_ITEM_QTY_FAIL,
      error: error.response.data.message,
    });
  }
};

export const noauthAddCartItems = (productId) => async (dispatch, getState) => {
  dispatch({ type: NOAUTH_ADD_CART_ITEM_LIST_REQUEST });
  try {
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    let {
      noAuthCartList: { cart },
    } = getState();
    console.log(cart);
    if (!cart) {
      cart = [];
    }
    if (cartItems) {
      if (cartItems.some((cart) => cart.productId === productId)) {
        const index = cartItems.findIndex(
          (cart) => cart.productId === productId
        );
        cartItems[index].qty = cartItems[index].qty + 1;
        if (cart.some((cart) => cart.cartList._id === productId)) {
          const index = cart.findIndex(
            (cart) => cart.cartList._id === productId
          );
          cart[index].qty = cart[index].qty + 1;
        }
      } else {
        let data = { productId, qty: 1 };
        cartItems.push(data);
        cart.push(data);
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
      cart.push(data);
    }
    dispatch({ type: NOAUTH_ADD_CART_ITEM_LIST_SUCCESS, payload: cart });
  } catch (error) {
    console.log(error);
    dispatch({ type: NOAUTH_ADD_CART_ITEM_LIST_FAIL, payload: "not added" });
  }
};
