import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import CustomButton from '../../Shared/CustomButton';
import { motion } from 'framer-motion';

const AdvertisedSection = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: advertised = [], isLoading } = useQuery({
    queryKey: ['advertised-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertised-properties');
      return res.data;
    }
  });

  if (isLoading) return <Spinner />;

  if (!advertised.length) return null;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-property-secondary">
        Advertisement
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {advertised.map(property => (
          <motion.div
            key={property._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group flex flex-col h-full transition-all duration-300"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(80,80,200,0.18)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                ${property.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
              `}>
                {property.status}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-property-secondary mb-1">{property.title}</h3>
              <p className="text-gray-500 mb-2">Location: {property.location}</p>
              <span className="text-md font-semibold text-property-secondary mb-2">
                Price Range: ৳ {property.priceRange}
              </span>
              <div className="mt-auto">
                <CustomButton
                  text="Details"
                  className="w-full py-2"
                  color="red"
                  onClick={() => navigate(`/property-details/${property._id}`)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedSection;