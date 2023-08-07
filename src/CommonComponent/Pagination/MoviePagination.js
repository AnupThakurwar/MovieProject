import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./MoviePagination.scss";

const MoviePagination = ({
  currentPage,
  TotalPages,
  previousPage,
  nextPage,
  onChange,
}) => {
  return (
    <div className="pagination-main-container">
      <div className="pagination-container">
        <div className="pagination-previous-arrow" onClick={previousPage}>
          <FaAngleLeft />
        </div>
        <div className="pagination-page">
          <div className="current-page">
            <input
              type="text"
              value={currentPage}
              className="page-input"
              onChange={onChange}
            />
          </div>
          <span className="ms-2 me-2">of</span>
          <div className="total-pages">{TotalPages}</div>
        </div>
        <div className="pagination-next-arrow" onClick={nextPage}>
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default MoviePagination;
