import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { editAddress } from "../../actions/userActions";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function EditAddress(props) {
  const { address, index } = props;
  console.log(address);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [fullName, setFullName] = useState(address.fullName);
  const [number, setNumber] = useState(address.number);
  const [pinCode, setPinCode] = useState(address.pinCode);
  const [state, setState] = useState(address.state);
  const [city, setCity] = useState(address.city);
  const [houseNumber, setHouseNumber] = useState(address.houseNumber);
  const [roadName, setRoadName] = useState(address.roadName);
  const [fullNameError, setFullNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [houseNumberError, setHouseNumberError] = useState(false);
  const [roadNameError, setRoadNameError] = useState(false);

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
      await dispatch(
        editAddress(
          fullName,
          number,
          pinCode,
          state,
          city,
          houseNumber,
          roadName,
          index
        )
      );
      setOpen(false);
      props.dialogClose(false);
    }
  };

  const closeDialog = () => {
    setOpen(false);
    props.dialogClose(false);
  };

  return (
    <Dialog
      disableBackdropClick={true}
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" style={{ width: "100%" }}>
        {"Edit shipping Address"}
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
            defaultValue={fullName}
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
            defaultValue={number}
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
            defaultValue={pinCode}
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
            defaultValue={state}
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
            defaultValue={city}
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
            defaultValue={houseNumber}
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
            defaultValue={roadName}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          style={{ float: "right" }}
          onClick={closeDialog}
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
  );
}

export default EditAddress;
