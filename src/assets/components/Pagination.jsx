import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const [displayedPage, setDisplayedPage] = useState(currentPage);

  const getPaginationRange = (page) => {
    const range = [];
    let startPage, endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, page - 2);
      endPage = Math.min(page + 3, totalPages);

      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 3);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return { range, startPage, endPage };
  };

  const { range, startPage, endPage } = getPaginationRange(displayedPage);

  const handleArrowClick = (direction) => {
    let newPage;
    if (direction === "left") {
      newPage = Math.max(1, currentPage - 1);
    } else if (direction === "right") {
      newPage = Math.min(totalPages, currentPage + 1);
    }

    if (newPage !== currentPage) {
      handlePageChange(newPage);
      setDisplayedPage(newPage);
    }
  };

  return (
    <Row className="my-3">
      <Col className="d-flex justify-content-center align-items-center">
        <i
          className={`bi bi-caret-left ${
            currentPage === 1 ? "d-none" : "me-3"
          }`}
          onClick={() => handleArrowClick("left")}
        ></i>
        <div>
          {startPage > 1 && (
            <>
              <Button
                variant="rounded-circle"
                className="text-secondary p-1"
                onClick={() => handlePageChange(1)}
              >
                {startPage > 1 && <span className="text-secondary">...</span>}
              </Button>
            </>
          )}
          {range.map((page) => (
            <Button
              key={page}
              variant=""
              className={
                currentPage === page
                  ? "rounded-circle bg-secondary text-white"
                  : "text-secondary"
              }
              onClick={() => {
                handlePageChange(page);
                setDisplayedPage(page);
              }}
            >
              {page}
            </Button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="text-secondary">...</span>
              )}
              <Button
                variant=""
                className="text-secondary"
                onClick={() => {
                  handlePageChange(totalPages);
                  setDisplayedPage(totalPages);
                }}
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>
        <i
          className={`bi bi-caret-right ${
            currentPage === totalPages ? "d-none" : "me-3"
          }`}
          onClick={() => handleArrowClick("right")}
        ></i>
      </Col>
    </Row>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
