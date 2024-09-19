import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Pagination from "./Pagination";
import FiltersSection from "./FiltersSection";

const MainSection = () => {
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [completedFilter, setCompletedFilter] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [filteredToDos, setFilteredToDos] = useState([]);

  const urlToDos = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(urlToDos);
        if (!response.ok) {
          throw new Error("To dos not found, go have fun.");
        }
        const data = await response.json();
        setToDos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const userIds = [...new Set(toDos.map((toDo) => toDo.userId))];

  useEffect(() => {
    const applyFilters = () => {
      const filtered = toDos.filter((toDo) => {
        const matchesSearch =
          !searchQuery ||
          toDo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompleted =
          completedFilter === null || toDo.completed === completedFilter;
        const matchesUserId =
          selectedUserId === "" || toDo.userId === parseInt(selectedUserId);

        return matchesSearch && matchesCompleted && matchesUserId;
      });

      setFilteredToDos(filtered);
    };

    applyFilters();
  }, [toDos, searchQuery, completedFilter, selectedUserId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, completedFilter, selectedUserId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toDoPerPage = 5;
  const totalToDos = filteredToDos.length;
  const totalPages = Math.ceil(totalToDos / toDoPerPage);
  const index = (currentPage - 1) * toDoPerPage;
  const currentToDos = filteredToDos.slice(index, index + toDoPerPage);

  return (
    <Container>
      <Row>
        <Col>
          <FiltersSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            completedFilter={completedFilter}
            setCompletedFilter={setCompletedFilter}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            userIds={userIds}
          />
        </Col>
        <Col lg={8} className="bg-info">
          <Container className="text-center">
            <Row className="text-secondary fw-bold border-bottom p-3">
              <Col lg={2} xs={4}>
                USER ID
              </Col>
              <Col lg={8} xs={4} className="text-start">
                TITLE
              </Col>
              <Col className="" lg={2} xs={4}>
                COMPLETED
              </Col>
            </Row>
            {loading ? (
              <Container>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden text-center">
                    Loading...
                  </span>
                </Spinner>
              </Container>
            ) : (
              currentToDos.map((toDo) => (
                <Row
                  key={toDo.id}
                  className="bg-white border-bottom border-danger border-3 my-4 p-3 align-items-center"
                >
                  <Col lg={2} xs={4}>
                    {toDo.userId}
                  </Col>
                  <Col lg={8} xs={4} className="text-start">
                    {toDo.title}
                  </Col>
                  <Col
                    className="text-end text-danger fs-3 text-center"
                    lg={2}
                    xs={4}
                  >
                    {toDo.completed ? "✓" : "✗"}
                  </Col>
                </Row>
              ))
            )}
            {currentToDos.length > 1 ? (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            ) : (
              <p>To do list not found</p>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default MainSection;
