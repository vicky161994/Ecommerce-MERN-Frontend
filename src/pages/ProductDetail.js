import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../actions/productActions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SocialShare from "../components/dialogs/SocialShare";
const useStyles = makeStyles({
  root: {
    marginTop: 49,
    marginBottom: 50,
    maxHeight: 510,
  },
  media: {
    height: 510,
  },
});

function ProductDetail(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const productID = props.match.params.id;
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productDetail(productID));
  }, [dispatch, productID]);

  const handleShareButton = () => {
    setOpenDialog(!openDialog);
  };

  const handleWishlist = () => {
    let data;
    data = localStorage.getItem("thevickyk.com-wishlist");
    if (data) {
      data = JSON.parse(data);
      if (data.includes(product.id)) {
        const index = data.indexOf(5);
        if (index > -1) {
          data.splice(index, 1);
        }
      } else {
        data.push(product.id);
      }
      localStorage.setItem("thevickyk.com-wishlist", JSON.stringify(data));
    }
    if (!data) {
      let data = [];
      data.push(product.id);
      localStorage.setItem("thevickyk.com-wishlist", JSON.stringify(data));
    }
  };
  const wishlist = localStorage.getItem("thevickyk.com-wishlist")
    ? JSON.parse(localStorage.getItem("thevickyk.com-wishlist"))
    : null;

  return (
    <Container>
      {openDialog && <SocialShare handleDialog={handleShareButton} />}
      {loading ? (
        <div>Product detail fetching...</div>
      ) : error ? (
        <div>some error here</div>
      ) : (
        <Row>
          <Col lg={6} md={12} sm={12} xs={12}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.category}
                />
              </CardActionArea>
            </Card>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className={classes.root}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className="productDetailh2"
              >
                {product.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                className="productDetailh6"
              >
                {product.category}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="productDetailp"
              >
                {product.description}
              </Typography>
              <Typography gutterBottom variant="h5" component="h3">
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>$</span>
                {product.price}
              </Typography>
              <div style={{ width: "100%" }}>
                <IconButton
                  aria-label="Share this product"
                  onClick={handleShareButton}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  aria-label="add to wishlist"
                  onClick={handleWishlist}
                >
                  <FavoriteIcon
                    className={`${
                      wishlist && wishlist.includes(product.id)
                        ? "addedtoWishlist"
                        : ""
                    }`}
                  />
                </IconButton>
              </div>
              <Button variant="contained" color="primary">
                add to cart
              </Button>
            </div>
          </Col>
        </Row>
      )}
      <style>
        {`
          .productDetailh2 {
            line-height: 1.5;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .productDetailp {
            line-height: 1.5;
            height:15em;
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

export default ProductDetail;
