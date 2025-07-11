import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = async () => {
    try {
      await logOut(); // From your AuthProvider
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = (
    <>
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
    </>
  );

  return (
    <div className="bg-property-bg text-property-text w-full shadow-md">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow-lg bg-property-bg rounded-box w-52 z-50"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src={logo}
                alt="PropertyPulse Logo"
                className="hidden lg:block w-[80px] h-[80px] rounded-full"
              />
            </Link>
            <Link
              to="/"
              className="hidden sm:flex text-property-text text-xl sm:text-2xl font-semibold"
            >
              PropertyPulse
            </Link>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center font-semibold">
            {navItems}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex gap-2">
          {!user ? (
            <>
              {/* Register */}
              <Link
                to="/signup"
                className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
              >
                <span className="absolute w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
                <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span className="relative text-white">Register</span>
                </span>
              </Link>

              {/* Login */}
              <Link
                to="/login"
                className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
              >
                <span className="absolute w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
                <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span className="relative text-white">Login</span>
                </span>
              </Link>
            </>
          ) : (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Dashboard
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gray-800 rounded-xl group cursor-pointer"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-600 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-gray-700 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;