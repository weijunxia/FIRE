import React, { useState } from 'react'
import {
  Nav,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Collapse,
  NavItem
} from 'reactstrap'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  const [isCollapsed, setCollapse] = useState(false)

  const toggle = () => setCollapse(!isCollapsed)

  return (
    <div>
      <NavBar color="dark" dark expand="md">
        <NavbarBrand href="/">fatFIRE</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isCollapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/goals">
                Goals
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </NavBar>
    </div>
  )
}
