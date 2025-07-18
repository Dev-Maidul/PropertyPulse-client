import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Spinner from '../../../Shared/Spinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const MySoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all sold properties for this agent
  const { data: sold = [], isLoading } = useQuery({
    queryKey: ['my-sold-properties', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/sold-properties/${user.email}`);
      return res.data;
    }
  });

  // Fetch total sold amount and chart data
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['my-sold-properties-summary', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/sold-properties/summary/${user.email}`);
      return res.data;
    }
  });

  if (isLoading || loadingSummary) return <Spinner />;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">My Sold Properties</h1>
      
      {/* Total Sold Amount */}
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#818CF8] text-white px-8 py-4 rounded-xl shadow-lg text-2xl font-bold">
          Total Sold Amount: ৳ {summary?.totalSold || 0}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-12 w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-property-secondary">Sold Amount by Property</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary?.chartData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="property" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#6366F1" name="Sold Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3">Buyer Name</th>
              <th className="p-3">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {sold.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">
                  No sold properties yet.
                </td>
              </tr>
            )}
            {sold.map(item => (
              <tr key={item._id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-semibold">{item.propertyTitle}</td>
                <td className="p-3">{item.propertyLocation}</td>
                <td className="p-3">{item.buyerEmail}</td>
                <td className="p-3">{item.buyerName}</td>
                <td className="p-3 font-bold text-property-secondary">৳ {item.offerAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;