import React from "react";
import "./SearchBar.scss";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchHandler, onSearchClick }) => {
  return (
    <div className="searchbar-container">
      <div className="searchbar-input-container">
        <input
          id="inputSearch"
          type="text"
          className="input-search"
          onChange={searchHandler}
          placeholder="...Search movies"
        />
      </div>
      <button className="search-icon" onClick={onSearchClick}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
