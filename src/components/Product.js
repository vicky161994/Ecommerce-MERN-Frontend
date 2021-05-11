import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SocialShare from "./dialogs/SocialShare";
import { useDispatch } from "react-redux";
import { addWishlist } from "../actions/userActions";
const useStyles = makeStyles({
  root: {
    margin: 10,
    maxHeight: 510,
  },
  media: {
    height: 250,
  },
});
function Product(props) {
  const classes = useStyles();
  let { product, index, user } = props;
  const [wishlist, setWishlist] = useState(user.wishlist);
  const [openDialog, setOpenDialog] = useState(false);
  let productCategory = product.category
    .split("-")
    .join("")
    .split(".")
    .join("")
    .split(",")
    .join("")
    .split("_")
    .join("")
    .split(" ")
    .join("-");
  const productUrl = product.title
    .split("-")
    .join("")
    .split(".")
    .join("")
    .split(",")
    .join("")
    .split("_")
    .join("")
    .split("-")
    .join("")
    .split(" ")
    .join("-");
  const dispatch = useDispatch();

  const handleWishlist = async (e) => {
    e.preventDefault();
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

  const handleShareButton = (e) => {
    setOpenDialog(!openDialog);
    return false;
  };

  return (
    <>
      {openDialog && <SocialShare handleDialog={handleShareButton} />}
      <div>
        <Card className={classes.root} key={index}>
          <Link to={`product/${productCategory}/${productUrl}/${product._id}`}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.category}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className="homepageh2"
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className="homepagep"
                >
                  {product.description}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  className="homepageh3"
                >
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                    $
                  </span>
                  {product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <div style={{ width: "100%" }}>
              <IconButton
                aria-label="Share this product"
                onClick={(e) => handleShareButton(e)}
              >
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="add to cart">
                <ShoppingCartIcon />
              </IconButton>
            </div>
            <div>
              <IconButton aria-label="add to wishlist" onClick={handleWishlist}>
                <FavoriteIcon
                  className={`${
                    wishlist && wishlist.includes(product._id)
                      ? "addedtoWishlist"
                      : ""
                  }`}
                />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default Product;
