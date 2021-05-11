import React, { useEffect, useState } from "react";

import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from "../actions/productActions";
import Product from "../components/Product";
import Pagination from "react-responsive-pagination";

function Homepage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  useEffect(() => {
    dispatch(productlist(page));
  }, [dispatch, page]);

  const paginateData = (pageno) => {
    setPage(pageno);
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <Row>
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
        <Col lg={12} md={12} sm={12} xs={12}>
          <Pagination
            current={page}
            total={products ? products.totalProduct : 0}
            onPageChange={paginateData}
          />
        </Col>
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
