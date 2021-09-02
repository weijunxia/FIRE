import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

export default function NavBarComp() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">fatFIRE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">Check</Nav>
            <Nav>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/saving-goal">Saving Goals</Nav.Link>
              <Nav.Link href="/about-us">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
