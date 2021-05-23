import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addLocale(en);

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

function Order(props) {
  const { order, index } = props;
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel);
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}bh-content`}
          id={`panel${index + 1}bh-header`}
        >
          <Typography className={classes.heading}>
            Order ID: <b>{order._id}</b>
          </Typography>
          <Typography className={`${classes.secondaryHeading} disp_mob_hide`}>
            Placed on:{" "}
            <b>
              {" "}
              <ReactTimeAgo date={new Date(order.createdAt)} locale="en-US" />
            </b>{" "}
          </Typography>

          <Typography className={`${classes.secondaryHeading} disp_mob_hide`}>
            Total Amt: <b>${parseInt(order.totalPrice).toFixed(2)}</b>
          </Typography>

          <Typography className={`${classes.secondaryHeading} disp_mob_hide`}>
            Status:{" "}
            <b
              className={
                order.status === "Delivered"
                  ? "text text-success"
                  : "text text-danger"
              }
            >
              {order.status ? order.status : "Not Available"}
            </b>
          </Typography>
        </AccordionSummary>
        {order.items.map((product, index) => {
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
          return (
            <AccordionDetails key={index}>
              <section
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  height="50"
                  width="50"
                ></img>
                <Link
                  target="_blank"
                  to={`product/${productCategory}/${productUrl}/${product._id}`}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h6"
                    style={{ color: "black" }}
                  >
                    {product.title}
                  </Typography>
                </Link>
                <Typography gutterBottom variant="h6" component="h6">
                  {`${product.qty} X $${product.price} = $${
                    product.qty * product.price
                  }`}
                </Typography>
              </section>
            </AccordionDetails>
          );
        })}
        <AccordionDetails>
          <Typography
            gutterBottom
            component="p"
            style={{ width: "100%", textAlign: "right" }}
          >
            <strong>Order placed on:</strong>{" "}
            {new Date(order.createdAt).toDateString()}
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <div>
            <Typography gutterBottom variant="h6" component="h6">
              Shipping Address
            </Typography>
            <div>
              <Typography gutterBottom component="p">
                <strong>Full Name:</strong> {order.address[0].fullName}
              </Typography>
              <Typography gutterBottom component="p">
                <strong>Address:</strong> {order.address[0].houseNumber},{" "}
                {order.address[0].roadName}, {order.address[0].city},{" "}
                {order.address[0].state}-{order.address[0].pinCode}
              </Typography>

              <Typography gutterBottom component="p">
                <strong>Mobile Number: </strong> {order.address[0].number}
              </Typography>
            </div>
          </div>
        </AccordionDetails>
        <AccordionDetails>
          <div>
            <Typography gutterBottom variant="h6" component="h6">
              Order summary
            </Typography>
            <div>
              <Typography gutterBottom component="p">
                Items: ${order.itemPrice ? order.itemPrice : 0}
              </Typography>
              <Typography gutterBottom component="p">
                Shipping: ${order.shippingPrice ? order.shippingPrice : 0}.00
              </Typography>

              <Typography gutterBottom component="p">
                Tax: ${order.taxPrice ? order.taxPrice : 0}
              </Typography>
              <Typography gutterBottom component="p">
                <strong>
                  Order Total: ${order.totalPrice ? order.totalPrice : 0}
                </strong>
              </Typography>
              <Typography gutterBottom component="p">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    order.status === "Delivered"
                      ? "text text-success"
                      : "text text-danger"
                  }
                >
                  {order.status ? order.status : "Not Available"}
                </span>
              </Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Order;
