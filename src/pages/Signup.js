import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import Person from "@material-ui/icons/Person";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Facebook from "@material-ui/icons/Facebook";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
function Signup() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [numberErrorMessage, setNumberErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const classes = useStyles();
  const userRegister = useSelector((state) => state.userRegister);
  const { user, loading, error } = userRegister;
  const dispatch = useDispatch();

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
  const handleEmail = (e) => {
    if (e.target.value === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
    } else {
      setEmail(e.target.value);
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };
  const handleMobileNumber = (e) => {
    if (e.target.value === "") {
      setNumberError(true);
      setNumberErrorMessage("mobile number is required");
    } else {
      setNumber(e.target.value);
      setNumberError(false);
      setNumberErrorMessage("");
    }
  };
  const handlePassword = (e) => {
    if (e.target.value === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
    } else {
      setPassword(e.target.value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (e.target.value !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Password does not matched");
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
  };
  const handleConfirmPassword = (e) => {
    if (e.target.value === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Confirm password is required");
    } else {
      setConfirmPassword(e.target.value);
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
    if (e.target.value !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Password does not matched");
    }
  };

  const handleRegister = async () => {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Name is required");
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
    }
    if (email !== "" && !emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email is not valid");
    }
    if (number === "") {
      setNumberError(true);
      setNumberErrorMessage("Number is required");
    }
    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Confirm password is required");
    }
    if (
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      numberError
    ) {
      return false;
    }
    await dispatch(register(name, email, password, number));
  };
  useEffect(() => {
    if (user) {
      if (user.status === "201") {
        setEmail("");
        setNumber("");
        setPassword("");
        setName("");
        setConfirmPassword("");
      }
    }
  }, [error, loading, user]);

  return (
    <Row>
      <Col lg={3}></Col>
      <Col lg={9} md={12} sm={12} xs={12}>
        <Card
          style={{ margin: "2rem 5rem", width: "50%" }}
          className="registerCard"
        >
          <CardContent>
            <h1 id="logintext">Register into Application</h1>
            {user && (
              <Typography
                className={`${user.status === "201" ? "success" : "danger"}`}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {user.message}
              </Typography>
            )}
            <div>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Full Name"
                value={name}
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
            </div>

            <div>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Email"
                value={email}
                onChange={handleEmail}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                error={numberError}
                helperText={numberErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Mobile Number"
                value={number}
                onChange={handleMobileNumber}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Password"
                type="password"
                value={password}
                onChange={handlePassword}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOff />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                style={{ width: "100%" }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOff />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="secondary"
                style={{ width: "100%", marginLeft: "1%", marginTop: "10px" }}
              >
                Register
              </Button>
            </div>
            <h6 style={{ marginTop: "20px" }}>OR</h6>
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Facebook />}
                style={{ width: "100%", marginLeft: "1%", marginTop: "10px" }}
              >
                Continue with Facebook
              </Button>
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", marginLeft: "1%", marginTop: "10px" }}
              >
                <i
                  className="fa fa-google-plus-circle"
                  aria-hidden="true"
                  style={{ fontSize: "20px", marginLeft: "-20px" }}
                ></i>{" "}
                &nbsp; Continue with Google
              </Button>
            </div>

            <div style={{ marginTop: "10px" }}>
              <Link to="forgot-password" className="forgotPassword">
                Forgot Password?
              </Link>
              <Link to="login" className="signup">
                Login
              </Link>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Col>
    </Row>
  );
}

export default Signup;
