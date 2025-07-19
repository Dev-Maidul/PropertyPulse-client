import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers, FaUserTie, FaHome, FaHourglassHalf,
  FaExclamationTriangle, FaComments, FaUserSecret
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Shared/Spinner";
import useAuth from "../../../Hooks/useAuth";

const cardIcons = [
  { icon: <FaUsers size={32} className="text-blue-500" />, bg: "bg-blue-50" },
  { icon: <FaUserTie size={32} className="text-green-500" />, bg: "bg-green-50" },
  { icon: <FaHome size={32} className="text-purple-500" />, bg: "bg-purple-50" },
  { icon: <FaHourglassHalf size={32} className="text-yellow-500" />, bg: "bg-yellow-50" },
  { icon: <FaExclamationTriangle size={32} className="text-red-500" />, bg: "bg-red-50" },
  { icon: <FaComments size={32} className="text-pink-500" />, bg: "bg-pink-50" },
  { icon: <FaUserSecret size={32} className="text-gray-700" />, bg: "bg-gray-100" }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } }
};

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading)
    return Spinner
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load dashboard stats.
      </div>
    );

  const cardData = [
    { title: "Total Users", value: data.usersCount, ...cardIcons[0] },
    { title: "Total Agents", value: data.agentsCount, ...cardIcons[1] },
    { title: "Total Properties", value: data.propertiesCount, ...cardIcons[2] },
    { title: "Pending Properties", value: data.pendingPropertiesCount, ...cardIcons[3] },
    { title: "Reported Properties", value: data.reportedPropertiesCount, ...cardIcons[4] },
    { title: "Total Reviews", value: data.reviewsCount, ...cardIcons[5] },
    { title: "Fraud Agents", value: data.fraudAgentsCount, ...cardIcons[6] },
  ];

  return (
    <motion.div
      className="min-h-[100vh] px-4 py-8 bg-gradient-to-br from-white to-blue-50"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-blue-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        Welcome, {user?.displayName || "Admin"}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        variants={container}
      >
        {cardData.map((cardItem) => (
          <motion.div
            key={cardItem.title}
            className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${cardItem.bg} hover:scale-105 transition-transform duration-300`}
            variants={card}
            whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
          >
            <div>{cardItem.icon}</div>
            <div>
              <div className="text-2xl font-semibold">{cardItem.value}</div>
              <div className="text-gray-600">{cardItem.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AdminHome;