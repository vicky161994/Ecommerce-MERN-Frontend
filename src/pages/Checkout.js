import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Col, Container, Row } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { addnewAddress } from "../actions/userActions";
import Address from "../components/Address";
import { AddAddressInOrderDetails } from "../actions/orderActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Checkout(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const cartList = useSelector((state) => state.cartList);
  const { products } = cartList;
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [roadName, setRoadName] = useState("");
  const [address, setAddress] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [houseNumberError, setHouseNumberError] = useState(false);
  const [roadNameError, setRoadNameError] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
    setFullNameError(false);
    setPinCodeError(false);
    setNumberError(false);
    setStateError(false);
    setCityError(false);
    setHouseNumberError(false);
    setRoadNameError(false);
  };

  const handleFullNameChange = (e) => {
    if (e.target.value === "") {
      setFullNameError(true);
    } else {
      setFullNameError(false);
      setFullName(e.target.value);
    }
  };

  const handlePinCodeChange = (e) => {
    if (e.target.value === "") {
      setPinCodeError(true);
    } else {
      setPinCodeError(false);
      setPinCode(e.target.value);
    }
  };

  const handleNumberChange = (e) => {
    if (e.target.value === "") {
      setNumberError(true);
    } else {
      setNumberError(false);
      setNumber(e.target.value);
    }
  };

  const handleStateChange = (e) => {
    if (e.target.value === "") {
      setStateError(true);
    } else {
      setStateError(false);
      setState(e.target.value);
    }
  };

  const handleCityChange = (e) => {
    if (e.target.value === "") {
      setCityError(true);
    } else {
      setCityError(false);
      setCity(e.target.value);
    }
  };

  const handleHouseNoChange = (e) => {
    if (e.target.value === "") {
      setHouseNumberError(true);
    } else {
      setHouseNumberError(false);
      setHouseNumber(e.target.value);
    }
  };

  const handleRoadNameChange = (e) => {
    if (e.target.value === "") {
      setRoadNameError(true);
    } else {
      setRoadNameError(false);
      setRoadName(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (fullName === "") {
      setFullNameError(true);
    }

    if (pinCode === "") {
      setPinCodeError(true);
    }

    if (number === "") {
      setNumberError(true);
    }

    if (state === "") {
      setStateError(true);
    }

    if (city === "") {
      setCityError(true);
    }

    if (houseNumber === "") {
      setHouseNumberError(true);
    }

    if (roadName === "") {
      setRoadNameError(true);
    }

    if (
      fullName === "" ||
      number === "" ||
      pinCode === "" ||
      state === "" ||
      city === "" ||
      houseNumber === "" ||
      roadName === ""
    ) {
      return false;
    } else {
      dispatch(
        addnewAddress(
          fullName,
          number,
          pinCode,
          state,
          city,
          houseNumber,
          roadName
        )
      );
    }
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
      <Dialog
        disableBackdropClick={true}
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ width: "100%" }}>
          {"Add new address for deliver"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              error={fullNameError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Full Name"
              onChange={handleFullNameChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={numberError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Phone Number"
              onChange={handleNumberChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={pinCodeError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Pin Code"
              onChange={handlePinCodeChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={stateError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="State"
              onChange={handleStateChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={cityError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="City"
              onChange={handleCityChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={houseNumberError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="House No, Building Name"
              onChange={handleHouseNoChange}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField
              error={roadNameError}
              style={{ width: "100%" }}
              className={classes.margin}
              id="input-with-icon-textfield"
              label="Road Name, Area Colony"
              onChange={handleRoadNameChange}
              autoComplete="off"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            style={{ float: "right" }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
