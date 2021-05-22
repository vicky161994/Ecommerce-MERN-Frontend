import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { chargePayment } from "../actions/orderActions";

function Payment(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const orderDetails = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { user, error, loading } = userLogin;
  const cartList = useSelector((state) => state.cartList);
  const { products } = cartList;

  if (!user) {
    props.history.push("/login");
    return false;
  }

  if (!products.data) {
    props.history.push("/cart");
    return false;
  }

  let totalAmt = 0;
  let taxPrice = 0;
  let shippingPrice = 0;
  const {
    data: { items, address },
  } = orderDetails;

  const toPrice = (num) => Number(num.toFixed(2));
  totalAmt = items.reduce((a, c) => a + c.qty * c.price, 0);
  shippingPrice = totalAmt < 100 ? toPrice(10) : toPrice(0);
  taxPrice = toPrice(0.15 * totalAmt);
  const totalPrice = totalAmt + shippingPrice + taxPrice;

  const makePayment = async (token) => {
    await dispatch(chargePayment(token, items, totalPrice, address));
    props.history.push("/order-detail");
  };
  return (
    <Container>
      <Row>
        <Col lg={9} md={12} sm={12} xs={12}>
          <ul className="payment-item-card">
            <li>
              <Card className="mt-4 p-3">
                <Typography gutterBottom variant="h6" component="h6">
                  Order items
                </Typography>
                {products.data.map((product, index) => {
                  let productCategory = product.cartList.category
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
                  const productUrl = product.cartList.title
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
                  return (
                    <div
                      key={index}
                      className="mb-4"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={product.cartList.image}
                        alt={product.cartList.title}
                        height="50"
                        width="50"
                        style={{ marginRight: "10px" }}
                      ></img>
                      <Link
                        to={`product/${productCategory}/${productUrl}/${product.cartList._id}`}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h6"
                          style={{ color: "black" }}
                        >
                          {product.cartList.title.substring(0, 50)}...
                        </Typography>
                      </Link>

                      <Typography gutterBottom variant="h6" component="h6">
                        {`${product.qty} X $${product.cartList.price} = $${
                          product.qty * product.cartList.price
                        }`}
                      </Typography>
                    </div>
                  );
                })}
              </Card>
            </li>

            <li>
              <Card className="mt-4 p-3">
                <Typography gutterBottom variant="h6" component="h6">
                  Shipping Address
                </Typography>
                <Typography gutterBottom component="p">
                  <strong>Full Name:</strong> {address.fullName}
                </Typography>
                <Typography gutterBottom component="p">
                  <strong>Address:</strong> {address.houseNumber},{" "}
                  {address.roadName}, {address.city}, {address.state}-
                  {address.pinCode}
                </Typography>

                <Typography gutterBottom component="p">
                  <strong>Mobile Number: </strong> {address.number}
                </Typography>
              </Card>
            </li>
          </ul>
        </Col>
        <Col lg={3} md={12} sm={12} xs={12}>
          <Card className="mt-4 mb-4 p-3">
            <Typography gutterBottom variant="h6" component="h6">
              Order summary
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom component="p">
                Items
              </Typography>
              <Typography gutterBottom component="p">
                ${totalAmt}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom component="p">
                Shipping
              </Typography>
              <Typography gutterBottom component="p">
                ${shippingPrice}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom component="p">
                Tax
              </Typography>
              <Typography gutterBottom component="p">
                ${taxPrice}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="b" component="b">
                Order Total
              </Typography>
              <Typography gutterBottom variant="b" component="b">
                ${totalPrice.toFixed(2)}
              </Typography>
            </div>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
            >
              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                token={makePayment}
                name={`Order Amount $${totalPrice.toFixed(2)}`}
              >
                <Button variant="contained" color="primary">
                  Make Payment
                </Button>
              </StripeCheckout>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
