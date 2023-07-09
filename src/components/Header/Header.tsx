import logo from "../../assets/balancer.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Summary from "../Welcome/Welcome";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full pt-3">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        {pathname === "/" && (
          <>
            <Link to="/login" className="hover:text-blue-600 font-bold">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600 font-bold">
              Register
            </Link>
          </>
        )}
        <Link to="/drug-summary" className="hover:text-blue-600 font-bold">
          Drug Summary
        </Link>
        <a
          href="https://codeforphilly.org/"
          target="_blank"
          className="black_btn">
          Code for Philly
        </a>
      </nav>
      <Summary />
    </header>
  );
};

export default Header;
