import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import Myntra from "../assets/Myntra.png"; 


const Header = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src={Myntra} alt="Myntra Logo" width={140} height={80} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/add-product">Add Product</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
