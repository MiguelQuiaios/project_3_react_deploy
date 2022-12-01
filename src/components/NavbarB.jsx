import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarB() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const logOut = () => {
    logout() 
    navigate('/')
  }

  return (

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Compatible Network</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

              {loggedIn && ( <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/groups">Groups</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => logOut()}>Logout</Nav.Link> 
                </>)}

                {!loggedIn && ( <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                </>
      )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

  );
}

export default NavbarB;