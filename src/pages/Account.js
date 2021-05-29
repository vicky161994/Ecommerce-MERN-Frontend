import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import ProfileAddress from "../components/ProfileAddress";
import NewAddress from "../components/dialogs/NewAddress";
import PersonalDetail from "../components/PersonalDetail";
import { Link } from "react-router-dom";

function Account(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, user, error } = userLogin;
  const [open, setOpen] = useState(false);

  if (!user) {
    props.history.push("/login");
    return false;
  }

  const openModalforNewAddress = async (e) => {
    setOpen(true);
  };

  const CloseModalforNewAddress = async (e) => {
    setOpen(false);
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Link className="order-history-link" to={"/order-history"}>
            Click here for order history
          </Link>
        </Col>
      </Row>

      {open && <NewAddress dialogClose={CloseModalforNewAddress} />}
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Typography className="mt-4" variant="h5" component="h5">
            My Account
          </Typography>
        </Col>
      </Row>
      {loading ? (
        <Typography variant="h5" component="h5">
          Account details loading, Please wait...
        </Typography>
      ) : error ? (
        <Typography variant="h5" component="h5">
          Some error occurred, Please try agian!
        </Typography>
      ) : (
        <>
          <Row>
            <Col lg={6} md={12} sm={12} xs={12} className="p-2">
              <PersonalDetail user={user} />
            </Col>
          </Row>

          <Row>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="h5">
                My Addresses
              </Typography>{" "}
              <Button
                onClick={openModalforNewAddress}
                variant="contained"
                color="primary"
                style={{ float: "right" }}
              >
                Add new address
              </Button>
            </div>
            {!user.address.length && (
              <div lg={12} md={12} sm={12} xs={12} style={{ display: "flex" }}>
                <Typography variant="h6" component="h6">
                  Address not found, Please add a new shipping address
                </Typography>
              </div>
            )}
            {user.address.map((address, index) => {
              return (
                <Col lg={6} md={6} sm={12} xs={12} className="p-2" key={index}>
                  <ProfileAddress address={address} index={index} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Account;
