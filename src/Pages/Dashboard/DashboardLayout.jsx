import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import {
  FaHome,
  FaUser,
  FaUserShield,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaStar,
  FaChartLine,
  FaAd,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/Logo.png";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  // All menu items (no role-based filtering for now)
  const navItems = [
    { name: "My Profile", href: "/dashboard/my-profile", icon: FaUser },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: FaList },
    { name: "Property Bought", href: "/dashboard/property-bought", icon: FaShoppingCart },
    { name: "My Reviews", href: "/dashboard/my-reviews", icon: FaStar },
    { name: "Agent Profile", href: "/dashboard/agent-profile", icon: FaUser },
    { name: "Add Property", href: "/dashboard/add-property", icon: FaPlus },
    { name: "My Added Properties", href: "/dashboard/my-added-properties", icon: FaList },
    { name: "My Sold Properties", href: "/dashboard/my-sold-properties", icon: FaShoppingCart },
    { name: "Requested Properties", href: "/dashboard/requested-properties", icon: FaList },
    { name: "Admin Profile", href: "/dashboard/admin-profile", icon: FaUserShield },
    { name: "Manage Properties", href: "/dashboard/manage-properties", icon: FaList },
    { name: "Manage Users", href: "/dashboard/manage-users", icon: FaUser },
    { name: "Manage Reviews", href: "/dashboard/manage-reviews", icon: FaStar },
    { name: "Reported Property", href: "/dashboard/reported-property", icon: FaAd },
    { name: "Advertise Property", href: "/dashboard/advertise-property", icon: FaAd },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E6F0FA] text-[#1E3A8A]">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Disclosure>
          {({ open }) => (
            <>
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
                  <Link to="/" className="flex items-center justify-center mb-4">
                    <img
                      src={logo}
                      alt="PropertyPulse Logo"
                      className="h-10 w-10 rounded-full mr-2"
                    />
                    <span className="text-xl font-bold">PropertyPulse</span>
                  </Link>
                  <ul className="w-full space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Disclosure.Button
                          as={NavLink}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-[#10B981] text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "flex items-center space-x-3 w-full text-left rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                            )
                          }
                          aria-label={`Go to ${item.name}`}
                        >
                          <item.icon size={18} />
                          <span>{item.name}</span>
                        </Disclosure.Button>
                      </li>
                    ))}
                    <li>
                      <Disclosure.Button
                        as="button"
                        onClick={handleLogout}
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
                  >
                    Back to Home
                  </Link>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Sidebar for Desktop */}
      <motion.div
        className="hidden md:flex flex-col w-64 bg-[#1E3A8A] text-white shadow-lg p-6 min-h-screen"
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
          {navItems.map((item) => (
            <motion.li key={item.name} variants={itemVariants}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-[#10B981] text-white"
                      : "text-white hover:bg-gray-700 hover:text-white",
                    "flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
                  )
                }
                aria-label={`Go to ${item.name}`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </motion.li>
          ))}
          <motion.li variants={itemVariants}>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out"
              aria-label="Logout"
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
          </motion.li>
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
        className="flex-1 p-6 md:p-8 overflow-y-auto bg-white rounded-lg shadow-inner"
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