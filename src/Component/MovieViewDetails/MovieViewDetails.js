import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import "./MovieViewDetails.scss";

const MovieViewDetails = ({ showDetails, viewDetails, img, closeHandler }) => {
  return (
    <div className={showDetails ? "detail-container" : "display-none"}>
      <div className="detail-image-container">
        <img
          src={img + viewDetails.backdrop_path}
          alt="details_Image"
          className="image-container"
        />
        <FaRegTimesCircle className="fa-cross" onClick={closeHandler} />
      </div>
      <div className="detail-information-container border">
        <label className="detail-title w-100">{viewDetails.title}</label>
        <div className="details-sub-info-container mt-2">
          <div className="sub-description">{viewDetails.overview}</div>
          <div className="sub-release-date mt-1">
            <span className="me-2">Release Date :</span>
            {viewDetails.release_date}
          </div>
          <div className="sub-original_language mt-1">
            <span className="me-2">Original Language :</span>
            {viewDetails.original_language}
          </div>
          <div className="sub-popularity mt-1">
            <span className="me-2">Popularity :</span>
            {viewDetails.popularity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieViewDetails;
