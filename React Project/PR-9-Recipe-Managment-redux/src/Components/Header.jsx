import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import brandLogo from "../assets/brand-logo.svg"; // ✅ Correct image import

const Header = () => (
  <Navbar expand="lg" className="app-header">
    <Container>
      <Navbar.Brand as={Link} to="/" className="brand-logo">
        <span className="brand-text">
          <img src={brandLogo} alt="Brand Logo" />
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Link to="/add-Recipe" className="add-book-link">
          + Add New Recipe
        </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
