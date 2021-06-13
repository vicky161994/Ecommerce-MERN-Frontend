import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, logout } from "../actions/userActions";
import { productlist } from "../actions/productActions";
import { noAuthAddToCart } from "../actions/cartActions";
import { wordsToNumbers } from "words-to-numbers";
import {
  AddAddressInOrderDetails,
  AddItemInOrderDetails,
} from "../actions/orderActions";
function AlanHooks(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const alanAPIKey = `${process.env.REACT_APP_ALAN_API_KEY}/stage`;
  let counter = 1;
  let addressCounter = 1;
  useEffect(() => {
    var alanBtnInstance = alanBtn({
      key: alanAPIKey,
      onCommand: async (commandData) => {
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
            if (parsedNumber > 0) {
              alanBtnInstance.playText(`item added to the cart`);
              selectedProduct = products.data[parsedNumber - 1];
              if (user) {
                dispatch(addToCart(selectedProduct._id, counter));
              } else {
                dispatch(noAuthAddToCart(selectedProduct._id, counter));
              }
            } else {
              alanBtnInstance.playText(
                `sorry i am not able to get the item, can you please repeat which item i need to add in your cart`
              );
            }
          }
          counter++;
        }
        if (commandData.command === "go-checkout") {
          await dispatch(AddItemInOrderDetails());
          props.history.push("/checkout");
        }
        if (commandData.command === "read-address") {
          if (addressCounter === 1) {
            if (user.address.length) {
              user.address.forEach((element, index) => {
                alanBtnInstance.playText(`Address number ${index + 1}`);
                alanBtnInstance.playText(
                  `${element.fullName} ${element.houseNumber} ${element.roadName} ${element.city} ${element.state} ${element.pinCode} " " ${element.number}`
                );
              });
              addressCounter++;
            }
          } else {
            alanBtnInstance.playText(
              `You have not added any address for shipping yet, Please add shipping address`
            );
          }
        }
        if (commandData.command === "select-address") {
          const parsedNumber = wordsToNumbers(commandData.address_number, {
            fuzzy: true,
          });
          let selectedAddress;
          if (user.address) {
            if (parsedNumber > 0) {
              selectedAddress = user.address[parsedNumber - 1];
              alanBtnInstance.playText(`shipping address added successfully`);
              if (selectedAddress) {
                console.log(selectedAddress);
                await dispatch(AddAddressInOrderDetails(selectedAddress));
                props.history.push("payment");
                return false;
              } else {
                alanBtnInstance.playText(`plese select shipping address`);
              }
            } else {
              alanBtnInstance.playText(
                `sorry i am not able to get the address, can you please repeat which address i need to add as shipping address`
              );
            }
          }
        }
      },
    });
  }, [alanAPIKey, props.history, productList]);
  return <div></div>;
}

export default AlanHooks;
