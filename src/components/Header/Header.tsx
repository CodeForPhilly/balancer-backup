import logo from "../../assets/balancer.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeClass = "text-blue-600 cursor-default font-bold";
  const inActiveClass = "hover:text-black font-bold";

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full pt-3">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </NavLink>
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? activeClass : inActiveClass
            }>
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? activeClass : inActiveClass
            }>
            Register
          </NavLink>
        </>

        <NavLink
          to="/drug-summary"
          className={({ isActive }) =>
            isActive ? activeClass : inActiveClass
          }>
          Drug Summary
        </NavLink>
        <a
          href="https://codeforphilly.org/"
          target="_blank"
          className="black_btn">
          Code for Philly
        </a>
      </nav>
    </header>
  );
};

export default Header;
