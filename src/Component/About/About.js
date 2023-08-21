import React from "react";
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { FaArrowCircleDown, FaClock, FaSmileBeam } from "react-icons/fa";
import Resume from "../../Resume/Anup_Thakurwar.pdf";
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
            {/* <label htmlFor="" className="react-movie-logo">
              React Movies
            </label> */}
          </div>
          <div className="info">
            A movie evening always starts with a very time-consuming and
            frustrating search for where to watch movies online. Experience a
            new level of thrill in your heart with popular movies at React
            Movies. React Movies is there to help you find all the movies you
            can stream legally in India and make your life easier. Find below
            the list of online movies available on Netflix, Hotstar, Zee and 10
            other streaming providers, organized by popularity.The web
            application is designed and created by Anup Thakurwar, If you've
            found my work that you think is awesome, valuable, or simply
            deserves recognition, please give a star on github and bookmark it
            for later reference.
            <div className="p-1">
              Thankyou for your{" "}
              <FaClock className="fs-5 text-warning" title="time" /> !
            </div>
            <div className="d-flex justify-content-between">
              <div className="email-section">anupthakurwar@gmail.com</div>
              <button className="resume-btn">
                <a href={Resume} download="Anup_Thakurwar_Resume.pdf">
                  Resume <FaArrowCircleDown />
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MovieFooter />
    </div>
  );
};

export default About;
