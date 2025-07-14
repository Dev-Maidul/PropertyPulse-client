import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Spinner from '../../Shared/Spinner';

const fetchProperties = async (email) => {
  const { data } = await axios.get(`/agent/properties?email=${email}`);
  return data;
};

const MyAddedProperties = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch properties
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['my-added-properties', user?.email],
    queryFn: () => fetchProperties(user.email),
    enabled: !!user?.email,
  });

  // Delete property mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/agent/property/${id}`);
    },
    onSuccess: () => {
      toast.success('Property Deleted!');
      queryClient.invalidateQueries(['my-added-properties', user?.email]);
    },
    onError: () => toast.error('Delete failed!'),
  });

  if (isLoading) return Spinner;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#1E3A8A]">My Added Properties</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {properties?.map((property) => (
          <motion.div
            key={property._id}
            className="bg-white rounded-lg shadow-md p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img src={property.imageUrl} alt={property.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">Agent: {property.agentName}</p>
              {property.agentImage && (
                <img src={property.agentImage} alt="Agent" className="w-10 h-10 rounded-full mt-1" />
              )}
              <p className="mt-1">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    property.status === "verified"
                      ? "text-green-600"
                      : property.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {property.status || "pending"}
                </span>
              </p>
              <p className="text-gray-600">Price Range: {property.priceRange}</p>
              {/* যদি min/max আলাদা থাকে */}
              {property.minPrice && property.maxPrice && (
                <p className="text-gray-600">
                  Min: {property.minPrice} | Max: {property.maxPrice}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                {/* Update button: status rejected হলে দেখাবে না */}
                {property.status !== "rejected" && (
                  <button
                    className="btn btn-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="btn btn-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteMutation.mutate(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No properties found.</div>
      )}
    </div>
  );
};

export default MyAddedProperties;