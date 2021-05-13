import Axios from "axios";
import {
  DELETE_ITEM_FROM_CART_FAIL,
  DELETE_ITEM_FROM_CART_REQUEST,
  DELETE_ITEM_FROM_CART_SUCCESS,
  GET_CART_ITEM_LIST_FAIL,
  GET_CART_ITEM_LIST_REQUEST,
  GET_CART_ITEM_LIST_SUCCESS,
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
