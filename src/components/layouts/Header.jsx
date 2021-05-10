import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user, loading, error } = userLogin;
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
                <ShoppingCartIcon />
              </Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <LinkContainer to="logout">
                <Nav.Link>
                  Logout
                  <ExitToAppIcon />
                </Nav.Link>
              </LinkContainer>
            )}
            {user && (
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
