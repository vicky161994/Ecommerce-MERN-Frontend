import {
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_FAIL,
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_REQUEST,
  ADD_ORDER_ITEMS_IN_ORDER_DETAIL_SUCCESS,
  ADD_ADDRESS_IN_ORDER_DETAIL_SUCCESS,
  PAYMENT_CHARGE_REQUEST,
  PAYMENT_CHARGE_FAIL,
  CLEAR_ORDER_SUCCESS,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAIL,
} from "../constants/orderConstants";

export const addOrderItemReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case ADD_ORDER_ITEMS_IN_ORDER_DETAIL_REQUEST:
      return { loading: true };
    case ADD_ORDER_ITEMS_IN_ORDER_DETAIL_SUCCESS:
      return { loading: false, items: action.payload };
    case ADD_ADDRESS_IN_ORDER_DETAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case CLEAR_ORDER_SUCCESS:
      return { ...state, data: [] };
    case ADD_ORDER_ITEMS_IN_ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chargePaymentReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case PAYMENT_CHARGE_REQUEST:
      return { loading: true };
    case PAYMENT_CHARGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOrderListReducer = (
  state = { loading: true, orderList: [] },
  action
) => {
  switch (action.type) {
    case GET_ORDER_LIST_REQUEST:
      return { loading: true };
    case GET_ORDER_LIST_SUCCESS:
      return { loading: false, orderList: action.payload };
    case GET_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
