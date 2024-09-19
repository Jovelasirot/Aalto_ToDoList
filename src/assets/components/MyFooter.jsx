import { Col, Container, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <Container fluid className="bg-secondary text-white p-5 mt-auto">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do
              eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrum exercitationem ullamco
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MyFooter;
