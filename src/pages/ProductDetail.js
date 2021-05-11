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
import { addWishlist } from "../actions/userActions";
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
  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;
  const [wishlist, setWishlist] = useState(user.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productDetail(productID));
  }, [dispatch, productID]);

  const handleShareButton = () => {
    setOpenDialog(!openDialog);
  };

  const handleWishlist = async () => {
    if (!user) {
      props.history.push("/login");
    } else {
      await dispatch(addWishlist(product._id));
      user = localStorage.getItem("thevickyk.com-userInfo")
        ? JSON.parse(localStorage.getItem("thevickyk.com-userInfo"))
        : null;
    }
    setWishlist(user.wishlist);
  };
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
              <Typography
                gutterBottom
                variant="h5"
                component="h3"
                className="price"
              >
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
                      wishlist && wishlist.includes(product._id)
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
    </Container>
  );
}

export default ProductDetail;
