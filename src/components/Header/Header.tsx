import logo from "../../assets/balancer.png";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import accountLogo from "../../assets/account.svg";
import chatBubble from "../../assets/chatbubble.svg";
import searchIcon from "../../assets/askme.svg";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import "../../components/Header/header.css";
// import Typed from "react-typed";
import { useState, useRef, useEffect, useContext } from "react";
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
  const handleSearchMenu = () => {
    setShowSearchMenu(!showSearchMenu);
  };

  const handleChat = () => {
    setShowChat(!showChat);
  };

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
    }, 300); // Adjust the delay time as needed
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
      setShowResearchMenu(false);
    }, 300); // Adjust the delay time as needed
  };

  useEffect(() => {
    return () => {
      if (delayTimeout !== null) {
        clearTimeout(delayTimeout);
      }
    };
  }, []);

  return (
    <header className="w-full items-center fixed">
      {/* <div className="flex bg-blue-500 text-center font-light text-white w-full h-8 items-center justify-center text-sm">
        WELCOME! STAY TUNE FOR OUR FIRST RELEASE! -
        <Typed strings={["  JULY 30th"]} typeSpeed={200} backSpeed={200} loop />
      </div> */}
      <div
        className={
          "hidden lg:flex items-center border-b border-gray-300 h-20 mx-auto bg-white justify-between  px-4 sm:px-6 md:px-8 lg:px-8 xl:px-50 2xl:px-56"
        }
      >
        <nav className="w-full flex font-satoshi items-center text-sm">
          {/* <Link to="/">
            <img src={logo} alt="logo" className="object-contain w-28 mr-5  " />
          </Link> */}
          <span className="orange_gradient mr-8 font-bold text-xl">
            Balancer
          </span>
          <>
            <Link
              to="/login"
              className="mr-5  text-black hover:text-black hover:no-underline hover:border-b-2 hover:border-blue-600"
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
                    ? "border-b-2 border-blue-600 hover:no-underline hover:border-b-2 hover:border-blue-600 cursor-pointer"
                    : "hover:text-black hover:no-underline hover:border-b-2 hover:border-blue-600 cursor-pointer"
                }`}
              >
                Features
                <span
                  className={` ${
                    showFeaturesMenu
                      ? "absolute ml-1.5 transition-transform duration-300 rotate-180"
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
                    ? "border-b-2 border-blue-600 hover:no-underline hover:border-b-2 hover:border-blue-600 cursor-pointer"
                    : "hover:text-black hover:no-underline hover:border-b-2 hover:border-blue-600 cursor-pointer"
                }`}
              >
                Research Information
                <span
                  className={` ${
                    showResearchMenu
                      ? "absolute ml-1.5 transition-transform duration-300 rotate-180"
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

        <nav className=" flex font-satoshi justify-end w-full items-center text-sm">
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
              className="hidden sm:flex items-center w-64 text-left space-x-3 px-4 h-9 bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
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
              <span className="flex-auto">Quick search...</span>
              <kbd className="font-sans font-semibold dark:text-slate-500">
                <abbr
                  title="Control"
                  className="no-underline text-slate-300 dark:text-slate-500"
                >
                  Ctrl{" "}
                </abbr>{" "}
                K
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
              className="mr-5 hover:text-black hover:no-underline hover:border-b-2 hover:border-blue-600"
            >
              Support
            </Link>
            <div onClick={handleLoginMenu}>
              <img
                src={accountLogo}
                alt="logo"
                className="object-contain hover: hover:border-blue-600 hover:border-b-2 cursor-pointer hover:cursor-pointer mr-5"
              />
            </div>
            <LoginMenuDropDown
              showLoginMenu={showLoginMenu}
              handleLoginMenu={handleLoginMenu}
            />
            <div onClick={handleChat}>
              <img
                src={chatBubble}
                alt="logo"
                className="object-contain hover: hover:border-blue-600 hover:border-b-2 cursor-pointer hover:cursor-pointer w-5  "
              />
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-4 py-2  rounded"
            >
              <img
                src={isDarkMode ? light : dark}
                alt={isDarkMode ? "Light Mode" : "Dark Mode"}
                className="object-contain hover: hover:border-blue-600 hover:border-b-2 cursor-pointer hover:cursor-pointer w-5  "
              />
            </button>
            <Chat showChat={showChat} handleChat={handleChat} />
          </>
        </nav>
      </div>
      <MdNavBar />
    </header>
  );
};

export default Header;
