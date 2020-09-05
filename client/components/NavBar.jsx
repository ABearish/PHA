import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const HomeBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>PHA</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav>
        <Nav.Link eventKey={1}>
          Potentially Hazardous Asteroids Tracker
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default HomeBar;
