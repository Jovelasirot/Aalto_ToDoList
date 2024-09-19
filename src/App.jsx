import { Col, Container } from "react-bootstrap";
import "./App.css";
import Mynavbar from "./assets/components/MyNavBar";
import MyFooter from "./assets/components/MyFooter";
import MainSection from "./assets/components/MainSection";

function App() {
  return (
    <Container fluid className="px-0 d-flex flex-column vh-100">
      <Col>
        <Mynavbar />
      </Col>
      <Col>
        <MainSection />
      </Col>
      <Col className="d-flex">
        <MyFooter />
      </Col>
    </Container>
  );
}

export default App;
