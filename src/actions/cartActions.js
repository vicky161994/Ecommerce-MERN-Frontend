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
  NO_AUTH_ADD_CART_FAIL,
  NO_AUTH_ADD_CART_REQUEST,
  NO_AUTH_ADD_CART_SUCCESS,
  NO_AUTH_DELETE_CART_FAIL,
  NO_AUTH_DELETE_CART_REQUEST,
  NO_AUTH_DELETE_CART_SUCCESS,
  NO_AUTH_QTY_CHANGED_FAIL,
  NO_AUTH_QTY_CHANGED_REQUEST,
  NO_AUTH_QTY_CHANGED_SUCCESS,
} from "../constants/cartConstants";

export const getcartItemList = () => async (dispatch, getState) => {
  dispatch({ type: GET_CART_ITEM_LIST_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.get("/api/carts/get-cart-item-list", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch({
      type: GET_CART_ITEM_LIST_SUCCESS,
      payload: data,
    });
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

export const noAuthAddToCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: NO_AUTH_ADD_CART_REQUEST });
  try {
    let reducerData;
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    if (cartItems) {
      if (cartItems.some((cart) => cart.productId === productId)) {
        const index = cartItems.findIndex(
          (cart) => cart.productId === productId
        );
        cartItems[index].qty = cartItems[index].qty + 1;
        reducerData = cartItems;
      } else {
        let data = { productId, qty: 1 };
        cartItems.push(data);
        reducerData = cartItems;
      }
      localStorage.setItem(
        "thevickyk.com-cartItems",
        JSON.stringify(cartItems)
      );
    } else {
      let cartItems = [];
      let data = { productId, qty: 1 };
      cartItems.push(data);
      reducerData = cartItems;
      localStorage.setItem(
        "thevickyk.com-cartItems",
        JSON.stringify(cartItems)
      );
    }
    dispatch({ type: NO_AUTH_ADD_CART_SUCCESS, payload: reducerData });
  } catch (error) {
    console.log(error);
    dispatch({
      type: NO_AUTH_ADD_CART_FAIL,
      error: error,
    });
  }
};

export const noAuthgetcartItemList = () => async (dispatch, getState) => {
  dispatch({ type: GET_CART_ITEM_LIST_REQUEST });
  try {
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    if (cartItems) {
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
    } else {
      dispatch({
        type: GET_CART_ITEM_LIST_SUCCESS,
        payload: { data: [] },
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

export const noAuthdeleteItemFromCart =
  (productId) => async (dispatch, getState) => {
    dispatch({ type: NO_AUTH_DELETE_CART_REQUEST });
    try {
      let reducerData;
      const cartItems = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
      if (cartItems.some((cart) => cart.productId === productId)) {
        const index = cartItems.findIndex(
          (cart) => cart.productId === productId
        );
        cartItems.splice(index, 1);
        reducerData = cartItems;
      }
      localStorage.setItem(
        "thevickyk.com-cartItems",
        JSON.stringify(cartItems)
      );
      dispatch({ type: NO_AUTH_DELETE_CART_SUCCESS, payload: reducerData });
    } catch (error) {
      console.log(error);
      dispatch({
        type: NO_AUTH_DELETE_CART_FAIL,
        error: error.message,
      });
    }
  };

export const noAuthManageItemQty = (productId, qty) => async (dispatch) => {
  dispatch({ type: NO_AUTH_QTY_CHANGED_REQUEST });
  try {
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    if (cartItems.some((cart) => cart.productId === productId)) {
      const index = cartItems.findIndex((cart) => cart.productId === productId);
      cartItems[index].qty = qty;
      localStorage.setItem(
        "thevickyk.com-cartItems",
        JSON.stringify(cartItems)
      );
      dispatch({ type: NO_AUTH_QTY_CHANGED_SUCCESS, payload: cartItems });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: NO_AUTH_QTY_CHANGED_FAIL,
      error: error.response.data.message,
    });
  }
};
