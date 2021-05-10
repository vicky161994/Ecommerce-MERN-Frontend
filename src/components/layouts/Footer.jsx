import React from "react";
import { Col, Row } from "react-bootstrap";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <Row noGutters={true} className="gx-0 footer">
      <Col lg={12}>
        <div>
          <p className="text-center">
            &copy; {new Date().getFullYear()} All Right Reserved
          </p>
        </div>
        <div className="text-center footer-social-icon">
          <Link to="#">
            <LinkedInIcon />
          </Link>
          <Link to="#">
            <GitHubIcon />
          </Link>
          <Link to="#">
            <TwitterIcon />
          </Link>
          <Link to="#">
            <InstagramIcon />
          </Link>
          <Link to="#">
            <FacebookIcon />
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default Footer;
