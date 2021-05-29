import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Address from "../components/Address";
import { AddAddressInOrderDetails } from "../actions/orderActions";
import NewAddress from "../components/dialogs/NewAddress";

function Checkout(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const cartList = useSelector((state) => state.cartList);
  const { products } = cartList;
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");

  if (!user) {
    props.history.push("/login");
    return false;
  }

  if (!products.data) {
    props.history.push("/cart");
    return false;
  }

  const openModalforNewAddress = async (e) => {
    setOpen(true);
  };

  const CloseModalforNewAddress = async (e) => {
    setOpen(false);
  };

  const getDeliverAddress = (data) => {
    setAddress(data);
  };

  const proceedToPayment = async () => {
    if (address === "") {
      alert("Please select address");
      return false;
    } else {
      await dispatch(AddAddressInOrderDetails(address));
      props.history.push("payment");
    }
  };

  return (
    <Container>
      {open && <NewAddress dialogClose={CloseModalforNewAddress} />}
      <Row className="checkout-page-row" style={{ margin: "1% !important" }}>
        <Col lg={6} md={12} sm={12} xs={12}>
          <Typography variant="h6" color="textSecondary" component="h6">
            Please select deliver address
          </Typography>
        </Col>
        <Col lg={6} md={12} sm={12} xs={12}>
          <Button
            onClick={openModalforNewAddress}
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            Add new address
          </Button>
        </Col>
      </Row>

      <Row>
        {user.address.map((address, index) => {
          return (
            <Col lg={6} md={12} sm={12} xs={12} key={index}>
              <Address
                address={address}
                index={index}
                getDeliverAddress={getDeliverAddress}
              />
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col lg={3} md={12} sm={12} xs={12} className="payment-btn">
          <Button
            variant="contained"
            color="primary"
            onClick={proceedToPayment}
          >
            proceed to payment
          </Button>
        </Col>
      </Row>
      <br />
    </Container>
  );
}

export default Checkout;
