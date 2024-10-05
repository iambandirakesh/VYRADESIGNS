import React, { useState, useEffect } from "react";
import VyraDesignsWhiteLogo from "../assets/logos/vyradesigns-logo.png";
import VyraDesignsBlackLogo from "../assets/logos/vyradesigns-white-transparent.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode } from "../Redux/modeSlice";
const AuthHeader = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      dispatch(setMode("dark"));
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      dispatch(setMode("light"));
    }
  }, [darkMode, dispatch]);

  const toggleTheme = () => {
    dispatch(setMode(darkMode ? "light" : "dark"));
    setDarkMode(!darkMode);
  };
  return (
    <nav className="w-full h-24 bg-white dark:bg-gray-900 shadow-md border-b-2 flex items-center">
      <div className="w-full flex flex-row justify-between items-center px-5">
        <div className="flex flex-row justify-center items-center gap-3 relative">
          <Link to="/">
            <img
              src={darkMode ? VyraDesignsBlackLogo : VyraDesignsWhiteLogo}
              alt="Vyra Designs"
              className="w-18 h-6 md:w-22 md:h-10 lg:w-34 lg:h-12"
            />
          </Link>
        </div>
        <div className=" cursor-pointer">
          <div className="flex flex-row gap-3 justify-center items-center">
            <div>
              <button
                id="theme-toggle"
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthHeader;
