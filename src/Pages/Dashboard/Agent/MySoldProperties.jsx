import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Spinner from '../../../Shared/Spinner';


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

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">My Sold Properties</h1>
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