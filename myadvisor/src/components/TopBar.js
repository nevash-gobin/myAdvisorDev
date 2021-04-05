import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar, Button } from 'react-bootstrap';

function TopBar() {

  function logOut(){
    localStorage.clear();
    window.location.reload(false);
  }

  const user = localStorage.getItem("user")

  return (
    <div>
      { user === "admin" ? (
        <Navbar expand="lg" bg="primary" variant="dark">
          <Navbar.Brand><Link to="/" className="top-bar-text">myAdvisor</Link></Navbar.Brand>
          
            <Nav className="ml-auto">
              <Button variant="outline-light" onClick={logOut}>Log Out</Button>
            </Nav>
        
        </Navbar>
        ) : ( 
        <div className="row">
          <div className="col-sm-10">
            <Navbar expand="lg" bg="primary" variant="dark">
              <Navbar.Brand><Link to="/" className="top-bar-text">myAdvisor</Link></Navbar.Brand>
              
                <Nav className="ml-auto">
                  <Button variant="outline-light" onClick={logOut}>Log Out</Button>
                </Nav>
            </Navbar>
          </div>
        </div> 
      )
      }
    </div>
  );
}

export default TopBar;
