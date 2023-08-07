import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import "./MovieFooter.scss";

const MovieFooter = () => {
  return (
    <div className="footer-container">
      <div className="footer-label">
        copyright <FaRegCopyright /> reactmovies.com
      </div>
    </div>
  );
};

export default MovieFooter;
