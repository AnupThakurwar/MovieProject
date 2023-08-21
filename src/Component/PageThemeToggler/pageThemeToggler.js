import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./pageThemeToggler.scss";

function PageThemeToggler({ toggleCallback }) {
  const [toggleTheme, setToggleTheme] = useState();
  let body = document.body;
  let theme;
  let lightTheme = "light";
  let darkTheme = "dark";

  useEffect(() => {
    toggleCallback(toggleTheme);
  }, [toggleTheme]);

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const themeToggler = (e) => {
    if (theme === lightTheme) {
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
      setToggleTheme(darkTheme);
    } else {
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      setToggleTheme(lightTheme);
    }
  };

  return (
    <div className="btn-container">
      <button
        className={toggleTheme === "dark" ? "theme active" : "theme"}
        onClick={themeToggler}
      >
        {toggleTheme === "light" ? (
          <FaSun className="text-warning" />
        ) : (
          <FaMoon className="text-light" />
        )}
      </button>
    </div>
  );
}

export default PageThemeToggler;
