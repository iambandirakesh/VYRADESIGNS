import React, { useState, useEffect } from "react";
import VyraDesignsWhiteLogo from "../assets/vyradesigns-logo.png";
import VyraDesignsBlackLogo from "../assets/vyradesigns-white-transparent.png";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { RiMenuFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="w-full h-24 bg-white dark:bg-gray-900 shadow-md flex items-center">
      <div className="w-full flex flex-row justify-between items-center px-5">
        <div className="flex flex-row justify-center items-center gap-3">
          <Link to="/">
            <img
              src={darkMode ? VyraDesignsBlackLogo : VyraDesignsWhiteLogo}
              alt="Vyra Designs"
              className="w-18 h-6 md:w-22 md:h-10 lg:w-34 lg:h-12"
            />
          </Link>
          <div className="w-[200px] md:w-[300px] lg:w-[500px]">
            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-100"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={
                    window.innerWidth >= 768
                      ? "Search to customize your design"
                      : "Search"
                  }
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Mobile menu icon */}
        <div className="lg:hidden cursor-pointer">
          {isMenuOpen ? (
            <IoMdClose size={25} />
          ) : (
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
              <div onClick={() => setMenuOpen(!isMenuOpen)}>
                <RiMenuFill
                  size={25}
                  className="text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex flex-row gap-5 items-center">
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
          <div className="hiddden lg:flex flex-row gap-5 items-center">
            <div className="text-lg font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
              About
            </div>
            <div className="text-lg font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
              Contact
            </div>
            <div className="text-lg font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
              Products
            </div>
            <div className="text-lg font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
              <FaCartShopping size={25} />
            </div>
            <div className="text-lg font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
              <IoPersonSharp size={25} />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white dark:bg-gray-900 z-50 flex flex-col justify-start space-y-4 p-8 text-gray-900 dark:text-gray-100 text-lg">
            <div
              className="cursor-pointer top-5 right-5"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <IoMdClose size={25} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <IoPersonSharp size={25} />
              <span>Account</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaCartShopping size={25} />
              <span>Cart</span>
            </div>
            <div className="cursor-pointer">Products</div>
            <div className="cursor-pointer">Contact</div>
            <div className="cursor-pointer">About</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
