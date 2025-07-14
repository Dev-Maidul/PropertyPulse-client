import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['my-added-properties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/properties?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/agent/property/${id}`);
    },
    onSuccess: () => {
      toast.success('Property Deleted!');
      queryClient.invalidateQueries(['my-added-properties', user?.email]);
    },
    onError: () => toast.error('Delete failed!'),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 cursor-pointer">
      <h2 className="text-2xl font-bold mb-4 text-[#1E3A8A]">My Added Properties</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {properties.length === 0 && (
          <div className="text-center text-gray-500 mt-10 col-span-2">No properties found.</div>
        )}
        {properties.map((property) => (
          <motion.div
            key={property._id}
            className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Property Image */}
            <div className="md:w-2/5 w-full h-56 md:h-auto flex-shrink-0 bg-gray-100 flex items-center justify-center">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="object-cover w-full h-full"
                style={{ minHeight: '180px', maxHeight: '250px' }}
                onError={e => { e.target.src = "https://i.ibb.co/2d9dKqk/placeholder-house.png"; }}
              />
            </div>
            {/* Card Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">{property.title}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Location:</span> {property.location}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Agent:</span>
                  <span>{property.agentName}</span>
                  {property.agentImage && (
                    <img
                      src={property.agentImage}
                      alt="Agent"
                      className="w-8 h-8 rounded-full border border-gray-300"
                      onError={e => { e.target.src = "https://i.ibb.co/2d9dKqk/placeholder-house.png"; }}
                    />
                  )}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      property.status === "verified"
                        ? "text-green-600 font-semibold"
                        : property.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {property.status ? property.status.charAt(0).toUpperCase() + property.status.slice(1) : "Pending"}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Price Range:</span>{" "}
                  <span className="text-gray-800">{property.priceRange}</span>
                </div>
                {(property.minPrice || property.maxPrice) && (
                  <div className="mb-1">
                    <span className="font-semibold">Min:</span> {property.minPrice || "-"}{" "}
                    <span className="font-semibold ml-2">Max:</span> {property.maxPrice || "-"}
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                {property.status !== "rejected" && (
                  <button
                    className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
                    onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="px-4 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
                  onClick={() => deleteMutation.mutate(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;