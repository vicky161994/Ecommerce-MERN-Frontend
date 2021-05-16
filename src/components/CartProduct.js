import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Button, MenuItem, Select } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCart,
  manageItemQty,
  noAuthdeleteItemFromCart,
  noAuthManageItemQty,
} from "../actions/cartActions";

function CartProduct(props) {
  const { product, qty } = props;
  const [quantity, setQuantity] = useState(qty);
  const userLogin = useSelector((state) => state.userLogin);
  let productCategory = product.category
    .split("-")
    .join("")
    .split(".")
    .join("")
    .split(",")
    .join("")
    .split("_")
    .join("")
    .split(" ")
    .join("-");
  const productUrl = product.title
    .split("-")
    .join("")
    .split(".")
    .join("")
    .split(",")
    .join("")
    .split("_")
    .join("")
    .split("-")
    .join("")
    .split(" ")
    .join("-");

  const handleChange = async (e) => {
    setQuantity(e.target.value);
    if (userLogin.user) {
      await dispatch(manageItemQty(product._id, e.target.value));
    } else {
      dispatch(noAuthManageItemQty(product._id, e.target.value));
    }
  };
  const dispatch = useDispatch();
  const ItemDeleteFromCart = async () => {
    if (userLogin.user) {
      dispatch(deleteItemFromCart(product._id));
    } else {
      dispatch(noAuthdeleteItemFromCart(product._id));
    }
  };

  return (
    <div>
      <Card className="cartpagecard">
        <div style={{ width: "100%", textAlign: "center" }}>
          <img
            height="100"
            width="100"
            src={product.image}
            alt="some text here"
          ></img>
        </div>
        <Link to={`product/${productCategory}/${productUrl}/${product._id}`}>
          <Typography
            gutterBottom
            variant="h6"
            component="h4"
            style={{
              color: "black",
              padding: "10px 0px",
              textAlign: "justify",
            }}
          >
            {product.title}
          </Typography>
        </Link>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            onChange={handleChange}
          >
            {new Array(10).fill(10).map((p, i) => (
              <MenuItem value={i + 1} key={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
          <Typography gutterBottom variant="h6" component="h4">
            ${product.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={ItemDeleteFromCart}
          >
            delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CartProduct;
