import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants";
export const productlist = (page, filterKeyword) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.post("/api/products/get-product-list", {
      limit: 12,
      page: page,
      filterKeyword,
    });
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const productDetail = (productID) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const { data } = await Axios.post(`/api/products/get-product/`, {
      _id: productID,
    });
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.message,
    });
  }
};
