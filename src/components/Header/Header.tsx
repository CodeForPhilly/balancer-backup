import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
// import chatBubble from "../../assets/chatbubble.svg";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import "../../components/Header/header.css";
// import Typed from "react-typed";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import MdNavBar from "./MdNavBar";
import LoginMenuDropDown from "./LoginMenuDropDown";
import SearchMenu from "./SearchMenu";
import Chat from "./Chat";
import { FeatureMenuDropDown } from "./FeatureMenuDropDown";
import { ResearchMenuDropDown } from "./ResearchMenuDropDown";
import { DarkModeContext } from "../../contexts/DarkModeContext";

const Header = () => {
  // const { pathname } = useLocation();
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showResearchMenu, setShowResearchMenu] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownResearchRef = useRef(null);
  let delayTimeout: number | null = null;
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };
  const handleSearchMenu = useCallback(() => {
    setShowSearchMenu((prev) => !prev);
  }, []);

  // const handleChat = () => {
  //   setShowChat(!showChat);
  // };

  const handleMouseEnter = () => {
    if (delayTimeout !== null) {
      clearTimeout(delayTimeout);
    }
    setShowFeaturesMenu(true);
    setShowResearchMenu(false);
  };

  const handleMouseLeave = () => {
    delayTimeout = setTimeout(() => {
      setShowFeaturesMenu(false);
    }, 300) as unknown as number; // Adjust the delay time as needed
  };

  const handleMouseEnterResearch = () => {
    if (delayTimeout !== null) {
      clearTimeout(delayTimeout);
    }
    setShowResearchMenu(true);
    setShowFeaturesMenu(false);
  };

  const handleMouseLeaveResearch = () => {
    delayTimeout = setTimeout(() => {
      setShowFeaturesMenu(false);
    }, 300) as unknown as number; // Adjust the delay time as needed
  };

  useEffect(() => {
    return () => {
      if (delayTimeout !== null) {
        clearTimeout(delayTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" && e.ctrlKey) {
        handleSearchMenu(); // This activates/deactivates the search.
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup - remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearchMenu]);
  return (
    <header className="fixed w-full items-center">
      <div className="hidden h-10 w-full items-center justify-center border-b border-gray-300 bg-blue-100 text-center text-sm font-light text-gray-500 md:flex">
        This app is currently in its beta testing phase. The information and
        tools provided herein are intended for general informational purposes
        only and should NOT be construed as medical advice, diagnosis, or
        treatment.
      </div>
      <div className="flex h-10 w-full items-center justify-center border-b border-gray-300 bg-blue-100 text-center text-sm font-light text-gray-500 md:hidden ">
        This app is currently in its beta testing phase. The information should
        NOT be construed as medical advice.
      </div>
      <div
        className={
          "xl:px-50 mx-auto hidden h-20 items-center justify-between border-b border-gray-300 bg-white  px-4 sm:px-6 md:px-8 lg:flex lg:px-8 2xl:px-56"
        }
      >
        <nav className="flex w-full items-center font-satoshi text-sm">
          {/* <Link to="/">
            <img src={logo} alt="logo" className="object-contain w-28 mr-5  " />
          </Link> */}
          <Link to="/">
            <span className="orange_gradient mr-8 text-xl font-bold">
              Balancer
            </span>
          </Link>

          <>
            <Link
              to="/login"
              className="mr-5  text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
            >
              Our Mission
            </Link>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
              className=""
            >
              <span
                className={` mr-9 text-black ${
                  showFeaturesMenu
                    ? "cursor-pointer border-b-2 border-blue-600 hover:border-b-2 hover:border-blue-600 hover:no-underline"
                    : "cursor-pointer hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                }`}
              >
                Features
                <span
                  className={` ${
                    showFeaturesMenu
                      ? "absolute ml-1.5 rotate-180 transition-transform duration-300"
                      : "absolute ml-1.5 "
                  }`}
                >
                  &#8593;
                </span>
              </span>
              {showFeaturesMenu && <FeatureMenuDropDown />}
            </div>

            <div
              onMouseEnter={handleMouseEnterResearch}
              onMouseLeave={handleMouseLeaveResearch}
              ref={dropdownResearchRef}
              className=""
            >
              <span
                className={` mr-9 text-black ${
                  showResearchMenu
                    ? "cursor-pointer border-b-2 border-blue-600 hover:border-b-2 hover:border-blue-600 hover:no-underline"
                    : "cursor-pointer hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                }`}
              >
                Research Information
                <span
                  className={` ${
                    showResearchMenu
                      ? "absolute ml-1.5 rotate-180 transition-transform duration-300"
                      : "absolute ml-1.5 "
                  }`}
                >
                  &#8593;
                </span>
                {showResearchMenu && <ResearchMenuDropDown />}
              </span>
            </div>
          </>
        </nav>

        <nav className=" flex w-full items-center justify-end font-satoshi text-sm">
          <div className="mr-5" onClick={handleSearchMenu}>
            {/* <img
                src={searchIcon}
                alt="logo"
                className="w-5 h-5 absolute ml-3 pointer-events-none"
              />
              <input
                placeholder="Ask me something"
                className="pr-3 pl-10 py-2 border-none placeholder-gray-500 text-black rounded-2xl ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              ></input> */}
            <button
              type="button"
              className="w-76 ring-slate-1000/10 dark:highlight-white/5 hidden h-9 items-center space-x-3 rounded-lg bg-white px-4 text-left text-slate-400 shadow-sm ring-1 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-800 dark:text-slate-300 dark:ring-0 dark:hover:bg-slate-700 sm:flex"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="flex-none text-slate-300 dark:text-slate-400"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
              <span className="flex-auto">See what others are saying...</span>
              <kbd className="font-sans font-semibold dark:text-slate-500">
                <abbr
                  title="Control"
                  className="text-slate-300 no-underline dark:text-slate-500"
                >
                  Ctrl
                </abbr>
                +m
              </kbd>
            </button>
          </div>
          <SearchMenu
            showSearchMenu={showSearchMenu}
            handleSearchMenu={handleSearchMenu}
          />

          <>
            <Link
              to="/register"
              className="mr-5 hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
            >
              Support
            </Link>
            <div onClick={handleLoginMenu}>
              <img
                src={accountLogo}
                alt="logo"
                className="hover: mr-1 cursor-pointer object-contain hover:cursor-pointer hover:border-b-2 hover:border-blue-600"
              />
            </div>
            <LoginMenuDropDown
              showLoginMenu={showLoginMenu}
              handleLoginMenu={handleLoginMenu}
            />
            {/* <div onClick={handleChat}>
              <img
                src={chatBubble}
                alt="logo"
                className="object-contain hover: hover:border-blue-600 hover:border-b-2 cursor-pointer hover:cursor-pointer w-5  "
              />
            </div> */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded px-4  py-2"
            >
              <img
                src={isDarkMode ? light : dark}
                alt={isDarkMode ? "Light Mode" : "Dark Mode"}
                className="hover: w-5 cursor-pointer object-contain hover:cursor-pointer hover:border-b-2 hover:border-blue-600  "
              />
            </button>
            <Chat showChat={showChat} setShowChat={setShowChat} />
          </>
        </nav>
      </div>
      <MdNavBar />
    </header>
  );
};

export default Header;
