import React, { useEffect, useState } from "react";

import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from "../actions/productActions";
import Product from "../components/Product";

function Homepage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(productlist());
  }, [dispatch]);

  const wishlist = localStorage.getItem("thevickyk.com-wishlist")
    ? JSON.parse(localStorage.getItem("thevickyk.com-wishlist"))
    : null;

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <Row>
          {products.map((product, index) => {
            return (
              <Col lg={4} md={4} sm={12} xs={12} key={product._id}>
                <Product product={product} index={index} wishlist={wishlist} />
              </Col>
            );
          })}
        </Row>
      )}

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
        `}
      </style>
    </Container>
  );
}

export default Homepage;
