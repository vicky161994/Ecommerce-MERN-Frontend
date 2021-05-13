import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Col, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getcartItemList } from "../actions/cartActions";
import CartProduct from "../components/CartProduct";

function Cart() {
  const cartList = useSelector((state) => state.cartList);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, products, error } = cartList;
  const dispatch = useDispatch();
  useEffect(() => {
    const { user } = userLogin;
    dispatch(getcartItemList());
  }, [dispatch, userLogin]);

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
              items) : $
              {products && products.data
                ? products.data.reduce(
                    (n, { cartList }) => n + cartList.price,
                    0
                  )
                : 0}{" "}
            </Typography>
            <Button variant="contained" color="primary">
              proceed to checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
