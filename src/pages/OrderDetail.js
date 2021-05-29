import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderDetail, getOrderList } from "../actions/orderActions";
import { Col, Container, Row } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Order from "../components/Order";
import Pagination from "react-responsive-pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0,
  },
}));

function OrderDetail(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const list = useSelector((state) => state.orderList);
  const { loading, orderList, error } = list;
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!user) {
      props.history.push("/login");
      return false;
    } else {
      dispatch(clearOrderDetail());
      dispatch(getOrderList(page));
    }
  }, [dispatch, user, page, props.history]);

  const paginateData = (pageno) => {
    setPage(pageno);
  };

  return (
    <Container>
      <Typography className="mt-4" variant="h5" component="h5">
        Order history
      </Typography>
      {loading ? (
        <div>
          <i className="fa fa-spinner fa-spin"></i>Loading...
        </div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <>
          <Row className="mt-4 mb-4">
            <Col lg={12} md={12} sm={12} xs={12}>
              {orderList.data.length === 0 && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: "center" }}
                  className="mt-2 text text-danger"
                >
                  You didn't place any order yet.
                </Typography>
              )}
              <div className={classes.root}>
                {orderList.data.map((order, index) => {
                  return <Order order={order} index={index} key={index} />;
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Pagination
                current={page}
                total={orderList ? orderList.totalPage : 0}
                onPageChange={paginateData}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default OrderDetail;
