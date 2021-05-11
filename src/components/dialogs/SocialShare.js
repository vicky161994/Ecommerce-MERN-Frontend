import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
  FacebookMessengerShareButton,
} from "react-share";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SocialShare(props) {
  const handleClose = () => {
    props.handleDialog(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            X
          </Button>
        </DialogActions>
        <DialogTitle id="alert-dialog-slide-title">
          {"Share this product with close one"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <InstapaperShareButton url={window.location.href}>
              <InstapaperIcon size={40} round={true} />
            </InstapaperShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
            <FacebookMessengerShareButton url={window.location.href}>
              <FacebookMessengerIcon size={40} round={true} />
            </FacebookMessengerShareButton>
            <EmailShareButton url={window.location.href}>
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
            <LineShareButton url={window.location.href}>
              <LineIcon size={40} round={true} />
            </LineShareButton>
            <TelegramShareButton url={window.location.href}>
              <TelegramIcon size={40} round={true} />
            </TelegramShareButton>
            <PinterestShareButton url={window.location.href}>
              <PinterestIcon size={40} round={true} />
            </PinterestShareButton>
            <TumblrShareButton url={window.location.href}>
              <TumblrIcon size={40} round={true} />
            </TumblrShareButton>
            <ViberShareButton url={window.location.href}>
              <ViberIcon size={40} round={true} />
            </ViberShareButton>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SocialShare;
