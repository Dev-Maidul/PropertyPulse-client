import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../Shared/Spinner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const SellingStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch sold properties for this agent
  const { data: sold = [], isLoading } = useQuery({
    queryKey: ["agent-selling-stats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/sold-properties/${user.email}`);
      return res.data;
    },
  });

  // Prepare chart data: group by propertyTitle, sum offerAmount
  const chartData = [];
  const map = {};
  sold.forEach((item) => {
    if (!map[item.propertyTitle]) {
      map[item.propertyTitle] = 0;
    }
    map[item.propertyTitle] += Number(item.offerAmount);
  });
  for (const title in map) {
    chartData.push({ property: title, amount: map[title] });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">
        Selling Statistics
      </h1>
      {chartData.length === 0 ? (
        <div className="text-center text-gray-500">No sold properties yet.</div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="property" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#6366F1" name="Sold Amount" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SellingStatistics;