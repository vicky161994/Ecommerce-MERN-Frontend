import React, { useState } from "react";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { changeNameNumber } from "../actions/userActions";
import NumberVerification from "./dialogs/NumberVerification";
import EmailVerification from "./dialogs/EmailVerification";

function PersonalDetail(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isNumberEdit, setIsNumberEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [numberErrorMessage, setNumberErrorMessage] = useState();
  const [isNameSpin, setIsNameSpin] = useState(false);
  const [isNumberSpin, setIsNumberSpin] = useState(false);
  const [openNumberDialog, setOpenNumberDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const handleChange = (type) => {
    if (type === "name") {
      setIsNameEdit(true);
    }
    if (type === "number") {
      setIsNumberEdit(true);
    }
  };

  const handleName = (e) => {
    if (e.target.value === "") {
      setNameError(true);
      setNameErrorMessage("Name is required");
    } else {
      setName(e.target.value);
      setNameError(false);
      setNameErrorMessage("");
    }
  };

  const handleNumber = (e) => {
    if (e.target.value === "") {
      setNumberError(true);
      setNumberErrorMessage("mobile number is required");
    } else {
      setNumber(e.target.value);
      setNumberError(false);
      setNumberErrorMessage("");
    }
  };

  const handleNameSubmit = async () => {
    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Name is required");
      return false;
    }
    setIsNameSpin(true);
    await dispatch(changeNameNumber(name, null));
    setIsNameSpin(false);
    setIsNameEdit(false);
  };

  const handleNumberSubmit = async () => {
    if (number === "") {
      setNumberError(true);
      setNumberErrorMessage("Number is required");
      return false;
    }
    setIsNumberSpin(true);
    await dispatch(changeNameNumber(null, number));
    setIsNumberSpin(false);
    setIsNumberEdit(false);
  };

  const openNumberVerificationDailog = async () => {
    setOpenNumberDialog(true);
  };

  const openEmailVerificationDailog = async () => {
    setOpenEmailDialog(true);
  };

  const CloseDialog = async (e) => {
    setOpenNumberDialog(false);
    setOpenEmailDialog(false);
  };

  return (
    <>
      {openNumberDialog && <NumberVerification dialogClose={CloseDialog} />}

      {openEmailDialog && <EmailVerification dialogClose={CloseDialog} />}
      <Card className="p-2">
        <Typography variant="h5" component="h5">
          Personal Detail
        </Typography>
        <div>
          {!isNameEdit && (
            <Typography color="textSecondary" component="p">
              Full Name: {user.name}{" "}
              <EditIcon
                className="edit-icon"
                onClick={() => handleChange("name")}
              />
            </Typography>
          )}
          {isNameEdit && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px 0px",
              }}
            >
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="input-with-icon-textfield"
                label="Full Name"
                defaultValue={name}
                onChange={handleName}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "0px 10px" }}
                onClick={() => setIsNameEdit(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNameSubmit}
              >
                {isNameSpin && <i className="fa fa-spinner fa-spin m-1"></i>}
                Save
              </Button>
            </div>
          )}
        </div>
        <div style={{ display: "flex" }} className="pl-2">
          <Typography color="textSecondary" component="p">
            Email: {user.email}
          </Typography>
          {/* <Tooltip
            title="email verified"
            placement="right-start"
            onClick={openEmailVerificationDailog}
          >
            <CheckCircleIcon color="primary" />
          </Tooltip> */}
        </div>
        <div>
          {!isNumberEdit && (
            <Typography color="textSecondary" component="p">
              Mobile Number: {user.number}{" "}
              <EditIcon
                className="edit-icon"
                onClick={() => handleChange("number")}
              />
              {/* <Tooltip
                onClick={openNumberVerificationDailog}
                title="Mobile number not verified. Click on icon for verify"
                placement="right-start"
              >
                <CheckCircleIcon />
              </Tooltip> */}
            </Typography>
          )}
          {isNumberEdit && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px 0px",
              }}
            >
              <TextField
                error={numberError}
                helperText={numberErrorMessage}
                id="input-with-icon-textfield"
                label="Full Name"
                defaultValue={number}
                onChange={handleNumber}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "0px 10px" }}
                onClick={() => setIsNumberEdit(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNumberSubmit}
              >
                {isNumberSpin && <i className="fa fa-spinner fa-spin m-1"></i>}
                Save
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default PersonalDetail;
