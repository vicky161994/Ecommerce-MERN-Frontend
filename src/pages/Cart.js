import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Col, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getcartItemList, noAuthgetcartItemList } from "../actions/cartActions";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import { AddItemInOrderDetails } from "../actions/orderActions";

function Cart(props) {
  const cartList = useSelector((state) => state.cartList);
  const userLogin = useSelector((state) => state.userLogin);
  const noAuthCart = useSelector((state) => state.noAuthCart);
  let totalAmt = 0;
  const { loading, products, error } = cartList;
  const dispatch = useDispatch();

  useEffect(() => {
    const { user } = userLogin;
    if (user) {
      dispatch(getcartItemList());
    } else {
      dispatch(noAuthgetcartItemList());
    }
  }, [dispatch, userLogin, noAuthCart]);

  const handleCheckout = async () => {
    if (!userLogin.user) {
      props.history.push("/login?redirect=checkout");
    } else {
      await dispatch(AddItemInOrderDetails());
      props.history.push("/checkout");
    }
  };
  if (products && products.data) {
    products.data.forEach((element, index) => {
      totalAmt = totalAmt + element.cartList.price * element.qty;
    });
  }

  return (
    <div>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ margin: "10px" }}
          >
            Shopping Cart
          </Typography>
        </Col>
      </Row>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <Row>
          {!products.data.length && (
            <Col lg={12} md={12} sm={12} xs={12}>
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                style={{ margin: "10px" }}
              >
                Shopping cart empty. <Link to="/">Go for Shopping</Link>
              </Typography>
            </Col>
          )}
          {products.data.map((product, index) => {
            return (
              <Col lg={4} md={6} sm={12} xs={12} key={index}>
                <CartProduct product={product.cartList} qty={product.qty} />
              </Col>
            );
          })}
        </Row>
      )}

      <Row className="justify-content-md-center mt-5">
        <Col lg={4} md={12} sm={12} xs={12} style={{ margin: "10px" }}>
          <Card
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="h4"
              style={{
                color: "black",
                padding: "10px 0px",
              }}
            >
              Subtotal (
              {products && products.data
                ? products.data.reduce((n, { qty }) => n + qty, 0)
                : 0}{" "}
              items) : $ {totalAmt.toFixed(2)}{" "}
            </Typography>
            <Button
              disabled={totalAmt > 0 ? false : true}
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              proceed to checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
