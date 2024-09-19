import PropTypes, { string } from "prop-types";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";

const FiltersSection = ({
  searchQuery,
  setSearchQuery,
  completedFilter,
  setCompletedFilter,
  selectedUserId,
  setSelectedUserId,
  userIds,
}) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setCompletedFilter(null);
    setSelectedUserId("");
  };

  return (
    <Container className="text-secondary bg-info">
      <Row className="flex-column mb-4">
        <Col className="text-center">
          <p className="fw-bold fs-3">FILTERS</p>
        </Col>
        <Col className="text-center">
          <Form className="d-flex ms-auto">
            <Button
              variant="outline-light"
              type="submit"
              className="rounded-0 bg-success border-dark"
            >
              <i className="bi bi-search"></i>
            </Button>
            <FormControl
              type="search"
              placeholder="Search.."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-0 border-dark"
              aria-label="Search"
            />
          </Form>
        </Col>
      </Row>
      <Row className="flex-column mt-5">
        <Col>
          <p className="fw-bold fs-6">COMPLETED</p>
        </Col>
        <Col className="d-flex align-items-center">
          <Container className="px-0">
            <ButtonGroup>
              <Button
                variant={
                  completedFilter === null ? "success" : "border border-dark"
                }
                onClick={() => setCompletedFilter(null)}
              >
                ALL
              </Button>
              <Button
                variant={
                  completedFilter === true ? "success" : "border border-dark"
                }
                onClick={() => setCompletedFilter(true)}
              >
                YES
              </Button>
              <Button
                variant={
                  completedFilter === false ? "success" : "border border-dark"
                }
                onClick={() => setCompletedFilter(false)}
              >
                NO
              </Button>
            </ButtonGroup>
          </Container>
        </Col>
      </Row>
      <Row className="flex-column mt-5">
        <Col className="">
          <p className="fw-bold fs-6">SELECT USER ID</p>
        </Col>
        <Col className="text-center">
          <Form className="d-flex ms-auto  border-dark bg-white">
            <FormControl
              as="select"
              className="rounded-0 border-dark"
              value={selectedUserId}
              onChange={handleUserIdChange}
            >
              <option value="">Select user ID</option>
              {userIds.map((userId) => (
                <option key={userId} value={userId}>
                  {userId}
                </option>
              ))}
            </FormControl>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5 mb-4">
        <Col className="text-center">
          <p className="text-decoration-underline" onClick={handleResetFilters}>
            Reset filters
          </p>
        </Col>
      </Row>
    </Container>
  );
};

FiltersSection.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  completedFilter: PropTypes.oneOf([true, false, null]),
  setCompletedFilter: PropTypes.func.isRequired,
  userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedUserId: PropTypes.string.isRequired,
  setSelectedUserId: PropTypes.func.isRequired,
};

export default FiltersSection;
