import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  cartListReducer,
  noAuthAddToCartReducer,
} from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  addOrderItemReducer,
  getOrderListReducer,
} from "./reducers/orderReducers";
const initialState = {
  userLogin: {
    user: localStorage.getItem("thevickyk.com-userInfo")
      ? JSON.parse(localStorage.getItem("thevickyk.com-userInfo"))
      : null,
  },
  noAuthCart: {
    cartList: localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  cartList: cartListReducer,
  noAuthCart: noAuthAddToCartReducer,
  orderDetails: addOrderItemReducer,
  orderList: getOrderListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
