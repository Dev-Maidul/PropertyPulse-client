import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaPlusCircle,
  FaCheckCircle,
  FaDollarSign,
  FaHourglassHalf,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Shared/Spinner";
import useAuth from "../../../Hooks/useAuth";


const cardIcons = [
  { icon: <FaPlusCircle size={32} className="text-blue-500" />, bg: "bg-blue-50" },
  { icon: <FaCheckCircle size={32} className="text-green-500" />, bg: "bg-green-50" },
  { icon: <FaDollarSign size={32} className="text-purple-500" />, bg: "bg-purple-50" },
  { icon: <FaHourglassHalf size={32} className="text-yellow-500" />, bg: "bg-yellow-50" },
  { icon: <FaTimesCircle size={32} className="text-red-500" />, bg: "bg-red-50" },
  { icon: <FaMoneyBillWave size={32} className="text-pink-500" />, bg: "bg-pink-50" },
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

const AgentHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["agent-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agent/dashboard-stats");
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
    { title: "Properties Added", value: data.addedCount, ...cardIcons[0] },
    { title: "Verified Properties", value: data.verifiedCount, ...cardIcons[1] },
    { title: "Sold Properties", value: data.soldCount, ...cardIcons[2] },
    { title: "Pending Offers", value: data.pendingOffersCount, ...cardIcons[3] },
    { title: "Rejected Properties", value: data.rejectedCount, ...cardIcons[4] },
    { title: "Total Earnings", value: `$${data.totalEarnings}`, ...cardIcons[5] },
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
        Welcome, {user?.displayName || "Agent"}
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

export default AgentHome;