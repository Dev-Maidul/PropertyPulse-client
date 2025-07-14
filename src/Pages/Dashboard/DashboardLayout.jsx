import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/Logo.png";

import Spinner from "../../Shared/Spinner";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import UserMenu from "./User/UserMenu";
import AgentMenu from "./Agent/AgentMenu";
import AdminMenu from "./Admin/AdminMenu";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Spinner />;

  // Utility function for class names
  const classNames = (...classes) =>
    classes.filter(Boolean).join(" ");

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Menu renderer
  const renderMenu = (classNamesFn, onItemClick) => {
    if (role === "admin") return <AdminMenu classNames={classNamesFn} onItemClick={onItemClick} />;
    if (role === "agent") return <AgentMenu classNames={classNamesFn} onItemClick={onItemClick} />;
    return <UserMenu classNames={classNamesFn} onItemClick={onItemClick} />;
  };

  return (
    <div className="flex min-h-screen bg-[#E6F0FA] text-[#1E3A8A]">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Disclosure>
          {({ open, close }) => (
            <div>
              <Disclosure.Button
                className="p-2 rounded-md bg-[#1E3A8A] text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>

              <Disclosure.Panel className="fixed inset-y-0 left-0 w-64 bg-[#1E3A8A] text-white shadow-lg rounded-r-lg z-30 p-4">
                <div className="flex flex-col items-center mb-6">
                  <Link
                    to="/"
                    className="flex items-center justify-center mb-4"
                    onClick={close}
                  >
                    <img
                      src={logo}
                      alt="PropertyPulse Logo"
                      className="h-10 w-10 rounded-full mr-2"
                    />
                    <span className="text-xl font-bold">PropertyPulse</span>
                  </Link>
                  <ul className="w-full space-y-2">
                    {renderMenu(
                      ({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-[#10B981] text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "flex items-center space-x-3 w-full text-left rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                        ),
                      close // Pass close as onItemClick
                    )}
                    <li>
                      <Disclosure.Button
                        as="button"
                        onClick={() => {
                          handleLogout();
                          close();
                        }}
                        className="flex items-center space-x-3 w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                        aria-label="Logout"
                      >
                        <FaSignOutAlt size={18} />
                        <span>Logout</span>
                      </Disclosure.Button>
                    </li>
                  </ul>
                  <Link
                    to="/"
                    className="mt-4 block text-center text-gray-300 hover:text-white underline"
                    aria-label="Go to Home"
                    onClick={close}
                  >
                    Back to Home
                  </Link>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Sidebar for Desktop */}
      <motion.div
        className="hidden md:flex flex-col w-68 bg-[#1E3A8A] text-white shadow-lg p-6 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <Link to="/" className="mb-8">
          <motion.img
            src={logo}
            alt="PropertyPulse Logo"
            className="h-12 w-12 rounded-full mr-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </Link>

        <ul className="flex flex-col space-y-2 flex-grow">
          {renderMenu(
            ({ isActive }) =>
              classNames(
                isActive
                  ? "bg-[#10B981] text-white"
                  : "text-white hover:bg-gray-700 hover:text-white",
                "flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              ),
            undefined // No need to close on desktop
          )}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              aria-label="Logout"
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        <div className="mt-8 pt-4 border-t border-gray-700">
          <Link
            to="/"
            className="block text-center text-gray-400 hover:text-white underline"
            aria-label="Go to Home"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        className="flex-1 p-6 md:p-8 overflow-y-auto bg-white rounded-lg shadow-inner ml-4"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default DashboardLayout;