import React from "react";
import "./bannerImage.scss";
import SearchBar from "../SearchBar/SearchBar";

const BannerImage = ({ searchHandler, onSearchClick, bannerImage = null }) => {
  return (
    <div className="bannerimage-container">
      <img src={bannerImage} className="w-100 h-100 bannerImage" alt="" />
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
