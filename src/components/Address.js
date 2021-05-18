import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

function Address(props) {
  const [deliverAddress, setDeliverAddress] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const { address, index } = props;
  const handleAddress = async (e) => {
    setDeliverAddress(user.address[e.target.value]);
    props.getDeliverAddress(user.address[e.target.value]);
  };
  return (
    <Card style={{ margin: "10px" }}>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            style={{ margin: "1%" }}
            type="radio"
            name="address"
            id="address"
            value={index}
            onChange={handleAddress}
          />
          <div style={{ margin: "1%" }}>
            <Typography variant="h6" color="textSecondary" component="h6">
              {address.fullName}
            </Typography>
            <Typography color="textSecondary" component="p">
              {address.houseNumber} {address.roadName}, <br />
              {address.city} <br /> {address.state} - {address.pinCode} <br />
              {address.number}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Address;
