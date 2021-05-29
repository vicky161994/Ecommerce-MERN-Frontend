import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function EmailVerification(props) {
  const handleClose = () => {
    props.dialogClose(false);
  };

  const handleResend = () => {
    console.log("clicked on resend button");
  };

  const handleVerify = () => {
    console.log("clicked on verify button");
    props.dialogClose(false);
  };
  return (
    <Dialog
      disableBackdropClick={true}
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Email Verificaion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We shot you an email, Please check. Thank you!
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Plese enter OTP..."
          type="text"
          autoComplete="off"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResend} color="secondary" variant="contained">
          Resend
        </Button>
        <Button onClick={handleVerify} color="primary" variant="contained">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailVerification;
