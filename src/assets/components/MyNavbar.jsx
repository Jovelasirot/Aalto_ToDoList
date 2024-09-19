import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import logoNav from "../img/aalto_it@2x.png";

const Mynavbar = () => {
  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand>
          <img src={logoNav} alt="aalto logo" height="60" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Mynavbar;
