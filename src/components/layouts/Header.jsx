import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "../../actions/userActions";
import Badge from "@material-ui/core/Badge";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user, loading, error } = userLogin;
  const { cartList } = useSelector((state) => state.cartList);
  const dispatch = useDispatch();
  const handleLogoutAction = () => {
    dispatch(logout());
  };
  let cartItems;
  if (user) {
    cartItems = user.cartItems;
  } else {
    cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
  }
  useEffect(() => {
    if (user) {
      cartItems = user.cartItems;
    } else {
      cartItems = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
    }
  }, []);
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Navbar
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
            <LinkContainer to="cart">
              <Nav.Link>
                Cart
                <Badge
                  badgeContent={
                    cartItems ? cartItems.reduce((n, { qty }) => n + qty, 0) : 0
                  }
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && user.token && (
              <Nav.Link onClick={handleLogoutAction}>
                Logout
                <ExitToAppIcon />
              </Nav.Link>
            )}
            {user && user.token && (
              <LinkContainer to="account">
                <Nav.Link>
                  Account <PersonIcon />
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
