import React from "react";
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { FaSmileBeam } from "react-icons/fa";
import "./About.scss";

const About = () => {
  return (
    <div>
      <MovieHeader />
      <div className="about-main-container">
        <div className="about-inner-container">
          <div className="logo">
            <strong className="fist-half">React</strong>{" "}
            <strong className="m ms-2">M</strong>
            <FaSmileBeam className="fa-smile" />
            VIES
          </div>
          <div className="info">
            React Movies a offical wesite for searching latest movies and adding
            your favorite movies to list you wanted to add. the source is
            information is taken from official websites and the data represents
            true in nature.the wepages are designed by Anup Thakurwar, please
            reach us if you like my hard work, at{" "}
            <em>anupthakurwar@gmail.com</em>
          </div>
        </div>
      </div>
      <MovieFooter />
    </div>
  );
};

export default About;
