import React, { useEffect, useState } from "react";
import "./dropdown.scss";
import { FaCaretDown, FaRegTimesCircle } from "react-icons/fa";

function Dropdown({ options, open, onMovieChange, clearSelection, isEdit }) {
  const [isopen, setIsOpen] = useState(false);
  const [optionArray, setOptionArray] = useState(options);

  useEffect(() => {
    setIsOpen(open);
    if (options) {
      setOptionArray(options);
    }
  }, [open, options]);

  const closeHandler = () => {
    setIsOpen(!isopen);
  };
  // console.log(optionArray, "optionArray");
  let selctedMovie = optionArray
    .filter((movie) => movie.checked === true)
    .map((item) => item.title);

  return (
    <div className="selectMovie-container">
      <div className="dropdown-container">
        <div className="dropdown-options">
          {selctedMovie.length > 0 ? (
            selctedMovie.map((movie) => {
              return (
                <button
                  key={movie}
                  className="dropdown-selection-btn"
                  title={movie}
                >
                  {movie}
                </button>
              );
            })
          ) : (
            <label className="no-selection">please select any movie</label>
          )}
        </div>
        <div className="dropdown-close-btn" onClick={clearSelection}>
          <FaRegTimesCircle />
        </div>
        <hr className="dropdown-divider" />
        <div className="dropdown-caret" onClick={closeHandler}>
          <FaCaretDown />
        </div>
        <ul className={isopen ? "dropdown-menu show" : "dropdown-menu"}>
          {optionArray.map((movies) => {
            return (
              <li key={movies.id} className="menu-items">
                <input
                  type="checkbox"
                  onChange={onMovieChange}
                  name={movies.title}
                  checked={movies.checked}
                />
                <div>{movies.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
