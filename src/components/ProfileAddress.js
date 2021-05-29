import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteAddress } from "../actions/userActions";
import EditAddress from "./dialogs/EditAddress";

function ProfileAddress(props) {
  const { address, index } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddressDelete = () => {
    dispatch(deleteAddress(index));
  };

  const handleAddressEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const CloseModalforNewAddress = async (e) => {
    setEditOpen(false);
  };

  return (
    <div>
      {editOpen && (
        <EditAddress
          dialogClose={CloseModalforNewAddress}
          address={address}
          index={index}
        />
      )}
      <Card className="mb-2">
        <CardHeader
          title={`Address #${index + 1}`}
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
        ></CardHeader>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleAddressEdit}>Edit</MenuItem>
          <MenuItem onClick={handleAddressDelete}>Delete</MenuItem>
        </Menu>
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="h6">
            {address.fullName}
          </Typography>
          <Typography color="textSecondary" component="p">
            {address.houseNumber} {address.roadName}, <br />
            {address.city} <br /> {address.state} - {address.pinCode} <br />
            {address.number}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileAddress;
