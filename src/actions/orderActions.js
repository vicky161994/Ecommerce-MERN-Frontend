import Axios from "axios";
import {
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_FAIL,
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_REQUEST,
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_SUCCESS,
  ADD_ADDRESS_IN_ORDER_DETAIL_SUCCESS,
  ADD_ADDRESS_IN_ORDER_DETAIL_FAIL,
  PAYMENT_CHARGE_REQUEST,
  PAYMENT_CHARGE_FAIL,
  CLEAR_ORDER_REQUEST,
  CLEAR_ORDER_SUCCESS,
  CLEAR_ORDER_FAIL,
  CLEAR_CART_SUCCESS,
  CLEAR_USER_CARTITEM_SUCCESS,
} from "../constants/orderConstants";

export const AddItemInOrderDetails = () => async (dispatch, getState) => {
  dispatch({ type: ADD_ORDER_ITEMS_IN_ORDER_DETAIL_REQUEST });
  try {
    const {
      cartList: { products },
    } = getState();
    if (products) {
      let orderDetails = [];
      products.data.forEach((product) => {
        let data = {
          _id: product.cartList._id,
          category: product.cartList.category,
          description: product.cartList.description,
          image: product.cartList.image,
          price: product.cartList.price,
          title: product.cartList.title,
          qty: product.qty,
        };
        orderDetails.push(data);
      });
      dispatch({
        type: ADD_ORDER_ITEMS_IN_ORDER_DETAIL_SUCCESS,
        payload: orderDetails,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_ORDER_ITEMS_IN_ORDER_DETAIL_FAIL, payload: error });
  }
};

export const AddAddressInOrderDetails =
  (address) => async (dispatch, getState) => {
    try {
      const { orderDetails } = getState();
      orderDetails.address = address;
      dispatch({
        type: ADD_ADDRESS_IN_ORDER_DETAIL_SUCCESS,
        payload: orderDetails,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_ADDRESS_IN_ORDER_DETAIL_FAIL, payload: error });
    }
  };

export const chargePayment =
  (token, items, totalPrice, address) => async (dispatch, getState) => {
    dispatch({ type: PAYMENT_CHARGE_REQUEST });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        "/api/orders/stripe/payment/charge",
        { token, items, totalPrice, address },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        let temp = localStorage.getItem("thevickyk.com-userInfo")
          ? JSON.parse(localStorage.getItem("thevickyk.com-userInfo"))
          : null;
        let newData = {
          address: temp.address,
          email: temp.email,
          name: temp.email,
          number: temp.number,
          token: temp.token,
          wishlist: temp.wishlist,
          _id: temp._id,
        };
        localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(newData));
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: PAYMENT_CHARGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearOrderDetail = () => (dispatch, getstate) => {
  dispatch({ type: CLEAR_ORDER_REQUEST });
  try {
    const {
      userLogin: { user },
      cartList: { products },
      orderDetails,
    } = getstate();
    user.cartItems = [];
    products["data"] = [];
    orderDetails.data.items = {};
    orderDetails.data.address = {};
    dispatch({ type: CLEAR_ORDER_SUCCESS, payload: orderDetails });
    dispatch({ type: CLEAR_CART_SUCCESS, payload: products });
    dispatch({ type: CLEAR_USER_CARTITEM_SUCCESS, payload: user });
  } catch (error) {
    console.log(error);
    dispatch({ type: CLEAR_ORDER_FAIL, payload: error });
  }
};
