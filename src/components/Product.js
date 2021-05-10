import React from "react";
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
  const { product, index, wishlist } = props;
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

  const handleWishlist = (e) => {
    e.preventDefault();
    let data;
    data = localStorage.getItem("thevickyk.com-wishlist");
    if (data) {
      data = JSON.parse(data);
      if (data.includes(product._id)) {
        const index = data.indexOf(product.id);
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

  return (
    <Link to={`product/${productCategory}/${productUrl}/${product._id}`}>
      <div>
        <Card className={classes.root} key={index}>
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
              <Typography gutterBottom variant="h5" component="h3">
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>$</span>
                {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div style={{ width: "100%" }}>
              <IconButton aria-label="Share this product">
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
                    wishlist && wishlist.includes(product.id)
                      ? "addedtoWishlist"
                      : ""
                  }`}
                />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </div>
    </Link>
  );
}

export default Product;
