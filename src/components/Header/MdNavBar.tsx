import closeLogo from "../../assets/close.svg";
import hamburgerLogo from "../../assets/hamburger.svg";
import { Link } from "react-router-dom";
import logo from "../../assets/balancer.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";

const MdNavBar = () => {
  const [nav, setNav] = useState(true);
  const { pathname } = useLocation();
  const [showChat, setShowChat] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      className={
        "mx-auto flex h-12 items-center justify-between border-b border-gray-300 bg-white px-5 lg:hidden"
      }
    >
      <nav className="flex w-full items-center">
        <Link to="/">
          <span className="orange_gradient mr-8 text-xl font-bold">
            Balancer
          </span>
        </Link>
      </nav>
      <div onClick={handleNav} className="">
        {nav && (
          <img
            src={hamburgerLogo}
            alt="logo"
            className="h-8 w-7 md:h-8 md:w-7"
          />
        )}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 h-full w-[100%] border-r border-r-gray-900 bg-white duration-500 ease-in-out"
            : "ease-out-in fixed left-[-100%] duration-1000"
        }
      >
        <div onClick={handleNav} className="flex justify-end">
          {!nav && (
            <img
              src={closeLogo}
              alt="logo"
              className="mr-4 mt-4 h-8 w-7 md:h-8 md:w-7"
            />
          )}
        </div>
        <div className="m-4">
          <span className="orange_gradient mr-8 text-xl font-bold">
            Balancer
          </span>
        </div>
        <ul className="font-satoshi uppercase">
          <li className="border-b border-gray-300 p-4">
            {pathname === "/" && (
              <>
                <Link
                  to="/login"
                  className="mr-9 text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                >
                  About Balancer
                </Link>
              </>
            )}
          </li>
          <li className="border-b border-gray-300 p-4">
            {pathname === "/" && (
              <>
                <Link
                  to="/register"
                  className="mr-9 text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
                >
                  Support
                </Link>
              </>
            )}
          </li>
          <li className="border-b border-gray-300 p-4">
            <Link
              to="/login"
              className="mr-9 text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
            >
              Features
              {/* <span className="absolute ml-1.5 transition-transform duration-300 hover:rotate-180">
                  &#8593;
                </span> */}
            </Link>
          </li>
          <li className="border-b border-gray-300 p-4">
            <Link
              to="/register"
              className="mr-9 text-black hover:border-b-2 hover:border-blue-600 hover:text-black hover:no-underline"
            >
              Information
              {/* <span className="absolute ml-1.5 transition-transform duration-300 hover:rotate-180">
                  &#8593;
                </span> */}
            </Link>
          </li>
        </ul>
      </div>
      <Chat showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default MdNavBar;
