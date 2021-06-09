import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from "../actions/productActions";
import Product from "../components/Product";
import Pagination from "react-responsive-pagination";
import { Button, TextField, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AlanHooks from "../components/AlanHooks";

function Homepage(props) {
  AlanHooks(props);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filterKeyword, setFilterKeyword] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  useEffect(() => {
    dispatch(productlist(page, filterKeyword));
  }, [dispatch, page]);

  const paginateData = (pageno) => {
    setPage(pageno);
  };

  const filterData = () => {
    setPage(1);
    dispatch(productlist(page, filterKeyword));
  };

  const resetFilter = () => {
    setPage(1);
    setFilterKeyword("");
    dispatch(productlist(page, ""));
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <center>
            <TextField
              className="homepage-filter search-filter-box"
              id="outlined-required"
              label="Search Product..."
              variant="outlined"
              style={{ marginTop: "15px", width: "60%" }}
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              autoComplete="off"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", marginLeft: "10px", height: "45px" }}
              onClick={filterData}
            >
              <SearchIcon />
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "10px", marginLeft: "10px", height: "45px" }}
              onClick={resetFilter}
            >
              <RotateLeftIcon />
              Reset
            </Button>
          </center>
        </Col>
      </Row>

      {loading ? (
        <div>
          <i className="fa fa-spinner fa-spin"></i>
          Loading ...
        </div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <Row>
          {products.data.length === 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ textAlign: "center" }}
              className="mt-2"
            >
              Product not found!
            </Typography>
          )}
          {products.data.map((product, index) => {
            return (
              <Col lg={4} md={4} sm={12} xs={12} key={product._id}>
                <Product product={product} index={index} user={user} />
              </Col>
            );
          })}
        </Row>
      )}
      <Row>
        {products && (
          <Col lg={12} md={12} sm={12} xs={12}>
            <Pagination
              current={page}
              total={
                products && products.totalProduct ? products.totalProduct : 0
              }
              onPageChange={paginateData}
            />
          </Col>
        )}
      </Row>

      <style>
        {`
        .homepageh2 {
          line-height: 1.5;
          height: 2.9em;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: black !important;
        }
        .homepagep {
          line-height: 1.5;
          height: 4.3em;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: justify;
        }
        .homepageh3 {
          color: black;
        }
        `}
      </style>
    </Container>
  );
}

export default Homepage;
