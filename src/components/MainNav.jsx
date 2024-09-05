import axios from "axios";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainNav({ brand }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    if (!user) {
      const res = await axios.get("/api/auth");
      setUser(res.data.user);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      setUser(null);
      navigate("/");
    }
  };
  return user ? (
    <Navbar className="bg-success navbar-dark" sticky="top">
        <Navbar.Brand href="/" className="p-2">{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto text-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/party">Party Info</Nav.Link>
            <Nav.Link href="/sessionNotes">Session Notes</Nav.Link>
            <Nav.Link href="/generators">Generators</Nav.Link>
            <Nav.Link href="/user">User</Nav.Link>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar  className="bg-success navbar-dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto text-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/party">Party Info</Nav.Link>
            <Nav.Link href="/sessionNotes">Session Notes</Nav.Link>
            <Nav.Link href="/generators">Generators</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
