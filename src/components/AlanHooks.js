import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, logout } from "../actions/userActions";
import { productlist } from "../actions/productActions";
import { noAuthAddToCart } from "../actions/cartActions";
import { wordsToNumbers } from "words-to-numbers";
function AlanHooks(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const alanAPIKey = `${process.env.REACT_APP_ALAN_API_KEY}/stage`;
  let counter = 1;
  useEffect(() => {
    var alanBtnInstance = alanBtn({
      key: alanAPIKey,
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "go-back") {
          props.history.goBack();
        }
        if (commandData.command === "go-homepage") {
          props.history.push("/");
        }
        if (commandData.command === "go-cart") {
          props.history.push("/cart");
        }
        if (commandData.command === "go-account") {
          if (!user) {
            alanBtnInstance.playText("Sorry you are not logged in");
            return false;
          } else {
            alanBtnInstance.playText(
              "(going to| taking you to) (the|) (profile|account) page. thank you"
            );
            props.history.push("/account");
          }
        }
        if (commandData.command === "go-order") {
          if (!user) {
            alanBtnInstance.playText("Sorry you are not logged in");
            return false;
          } else {
            alanBtnInstance.playText(
              "(going to| taking you to) (the|) (order|order-history) page. thank you"
            );
            props.history.push("/order-history");
            return false;
          }
        }
        if (commandData.command === "logout") {
          if (!user) {
            alanBtnInstance.playText("Sorry you are not logged in");
            return false;
          } else {
            alanBtnInstance.playText("are you sure, you want to logout");
          }
        }
        if (commandData.command === "logout-confirm") {
          dispatch(logout());
          return false;
        }
        if (commandData.command === "product-search") {
          dispatch(productlist(1, commandData.searchKeyword));
        }
        if (commandData.command === "go-login") {
          props.history.push("/login");
        }
        if (commandData.command === "go-signup") {
          props.history.push("/signup");
        }
        if (commandData.command === "next-page") {
          dispatch(productlist(2, null));
        }
        if (commandData.command === "previous-page") {
          dispatch(productlist(1, null));
        }
        if (commandData.command === "add-item-to-cart") {
          let selectedProduct;
          const parsedNumber = wordsToNumbers(commandData.item_no, {
            fuzzy: true,
          });
          if (products.data) {
            alanBtnInstance.playText(`item added to the cart`);
            selectedProduct = products.data[parsedNumber + 1];
            if (user) {
              dispatch(addToCart(selectedProduct._id, counter));
            } else {
              dispatch(noAuthAddToCart(selectedProduct._id, counter));
            }
          }
          counter++;
        }
      },
    });
  }, [alanAPIKey, props.history, productList]);
  return <div></div>;
}

export default AlanHooks;
