import "../../components/Header/header.css";
import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";

import LoginMenuDropDown from "./LoginMenuDropDown";
import MdNavBar from "./MdNavBar";
import accountLogo from "../../assets/account.svg";
import logo from "../../assets/balancer.png";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";

const featureLinks = [
  { url: "/", title: "Diagnosis" },
  { url: "/drug-summary", title: "Drug Summary and Comparison" },
  { url: "/", title: "Drug Review Lookup" },
];

const researchLinks = [
  { url: "/", title: "PubMed" },
  { url: "/", title: "Google Scholar" },
  { url: "/", title: "ScienceDirect" },
];

const Header = () => {
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showResearchMenu, setShowResearchMenu] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownResearchRef = useRef(null);
  let delayTimeout: number | null = null;
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const handleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  // TODO: refactor this to be more DRY.

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
  }, [delayTimeout]);

  return (
    <header className="fixed w-full items-center">
      {/* <div className="flex bg-blue-500 text-center font-light text-white w-full h-8 items-center justify-center text-sm">
        WELCOME! STAY TUNE FOR OUR FIRST RELEASE! -
      </div> */}
      <div
        className={
          "xl:px-50 mx-auto hidden h-20 items-center justify-between border-b border-gray-300 bg-white  px-4 sm:px-6 md:px-8 lg:flex lg:px-8 2xl:px-56"
        }>
        <nav className="flex w-full items-center font-satoshi text-sm">
          <Link to="/">
            <img src={logo} alt="logo" className="mr-9 w-28 object-contain  " />
          </Link>
          <>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
              className="">
              <span
                className={` mr-9 text-black ${
                  showFeaturesMenu
                    ? "cursor-pointer border-b-2 border-blue-600 hover:border-b-2 hover:border-blue-600 hover:no-underline"
                    : "cursor-pointer hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                }`}>
                Features
                <span
                  className={` ${
                    showFeaturesMenu
                      ? "absolute ml-1.5 rotate-180 transition-transform duration-300"
                      : "absolute ml-1.5 "
                  }`}>
                  &#8593;
                </span>
              </span>
              {showFeaturesMenu && <DropDownMenu links={featureLinks} />}
            </div>

            <div
              onMouseEnter={handleMouseEnterResearch}
              onMouseLeave={handleMouseLeaveResearch}
              ref={dropdownResearchRef}
              className="">
              <span
                className={`mr-9 text-black ${
                  showResearchMenu
                    ? "cursor-pointer border-b-2 border-blue-600 hover:border-b-2 hover:border-blue-600 hover:no-underline"
                    : "cursor-pointer hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                }`}>
                Research Information
                <span
                  className={` ${
                    showResearchMenu
                      ? "absolute ml-1.5 rotate-180 transition-transform duration-300"
                      : "absolute ml-1.5 "
                  }`}>
                  &#8593;
                </span>
                {showResearchMenu && <DropDownMenu links={researchLinks} />}
              </span>
            </div>
          </>
        </nav>

        <nav className=" flex w-full items-center justify-end font-satoshi text-sm">
          <>
            <Link
              to="/login"
              className="mr-9  text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline">
              About Balancer
            </Link>
            <Link
              to="/register"
              className="mr-9  text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline">
              Support
            </Link>
            <div onClick={handleLoginMenu}>
              <img
                src={accountLogo}
                alt="logo"
                className="object-contain hover:cursor-pointer hover:border-b-2 hover:border-blue-600 hover:fill-current"
              />
            </div>
            <LoginMenuDropDown
              showLoginMenu={showLoginMenu}
              handleLoginMenu={handleLoginMenu}
            />
          </>
        </nav>
      </div>
      <MdNavBar />
    </header>
  );
};

export default Header;
