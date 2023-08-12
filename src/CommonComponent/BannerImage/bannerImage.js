import React from "react";
import "./bannerImage.scss";
import SearchBar from "../SearchBar/SearchBar";

const BannerImage = ({ searchHandler, onSearchClick }) => {
  return (
    <div className="bannerimage-container">
      <div className="banner-text-container">
        <label htmlFor="" className="banner-heading">
          Welcome
        </label>
        <label className="banner-subtext">
          Millions of movies to discover. Explore now.
        </label>
        <SearchBar
          searchHandler={searchHandler}
          onSearchClick={onSearchClick}
        />
      </div>
    </div>
  );
};

export default BannerImage;
