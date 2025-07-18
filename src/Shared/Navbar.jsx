import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/Logo.png";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Navbar items (Home, All Properties)
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#4F46E5] font-bold"
              : "hover:text-[#4F46E5] font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            isActive
              ? "text-[#4F46E5] font-bold"
              : "hover:text-[#4F46E5] font-medium"
          }
        >
          All Properties
        </NavLink>
      </li>
    </>
  );

  // Framer Motion variants
  const logoVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  };
  const userVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.15 } },
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md w-full">
      <div className="px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo and Name */}
          <motion.div
            className="flex items-center gap-2"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Link to="/">
              <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
            </Link>
            <Link to="/" className="text-3xl font-extrabold text-gray-800 hidden sm:block">
              PropertyPulse
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul
            className="hidden md:flex gap-8 items-center text-lg"
            initial="hidden"
            animate="visible"
            variants={menuVariants}
          >
            {navItems}
          </motion.ul>

          {/* User Info & Auth Buttons */}
          <motion.div
            className="flex items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={userVariants}
          >
            {user ? (
              <>
                {/* User Photo with Tooltip */}
                <div className="relative group">
                  <motion.img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                    {user.displayName}
                  </span>
                </div>
                {/* Dashboard Button */}
                <CustomButton
                  text="Dashboard"
                  to="/dashboard"
                  color="blue"
                  className="px-6 py-2"
                />
                {/* Logout Button */}
                <CustomButton
                  text="Logout"
                  onClick={handleLogout}
                  color="red"
                  className="px-6 py-2"
                />
              </>
            ) : (
              <>
                <CustomButton
                  text="Login"
                  to="/login"
                  color="blue"
                  className="px-6 py-2"
                />
                <CustomButton
                  text="Register"
                  to="/signup"
                  color="green"
                  className="px-6 py-2"
                />
              </>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open Menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ul className="flex flex-col gap-2 p-4 border-t">{navItems}</ul>
          <div className="flex flex-col gap-2 px-4 pb-4">
            {user ? (
              <>
                <div className="relative group flex items-center gap-2">
                  <motion.img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <span className="absolute left-16 mt-2 px-3 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                    {user.displayName}
                  </span>
                </div>
                <CustomButton
                  text="Dashboard"
                  to="/dashboard"
                  color="blue"
                  className="px-6 py-2"
                  onClick={() => setMenuOpen(false)}
                />
                <CustomButton
                  text="Logout"
                  onClick={handleLogout}
                  color="red"
                  className="px-6 py-2"
                />
              </>
            ) : (
              <>
                <CustomButton
                  text="Login"
                  to="/login"
                  color="blue"
                  className="px-6 py-2"
                  onClick={() => setMenuOpen(false)}
                />
                <CustomButton
                  text="Register"
                  to="/signup"
                  color="green"
                  className="px-6 py-2"
                  onClick={() => setMenuOpen(false)}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;