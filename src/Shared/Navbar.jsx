import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const navItems = (
    <ul className="flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-6 font-semibold">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-property-secondary ${
              isActive ? "text-property-secondary" : "text-property-text"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            `hover:text-property-secondary ${
              isActive ? "text-property-secondary" : "text-property-text"
            }`
          }
        >
          All Properties
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="bg-property-bg text-property-text w-full shadow-md">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-property-bg rounded-box z-10 mt-3 w-52 p-4 shadow-lg"
              aria-label="Mobile Navigation"
            >
              {navItems}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Link to="/">
              <img
                className="hidden lg:block w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] rounded-full"
                src={logo}
                alt="PropertyPulse Logo"
              />
            </Link>
            <Link
              to="/"
              className="hidden sm:flex items-center text-property-text text-xl sm:text-2xl font-semibold"
            >
              PropertyPulse
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex gap-2">
          <Link to='/login'>
            <a
              href="#_"
              class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
            >
              <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
              <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                <span class="relative text-white">Login</span>
              </span>
            </a>
          </Link>
          <Link to='/dashboard'>
            <a
              href="#_"
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
            >
              <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Dashboard
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
