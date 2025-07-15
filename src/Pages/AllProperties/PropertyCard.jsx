import React from 'react';
import { motion } from 'framer-motion';
import CustomButton from '../../Shared/CustomButton';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, onDetails }) => {
    const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:border-property-secondary group"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
          ${property.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
        `}>
          {property.status}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-property-secondary mb-1">{property.title}</h2>
        <p className="text-gray-500 mb-2">Location: {property.location}</p>
        <div className="flex items-center mb-2">
          <img
            src={property.agentImage}
            alt={property.agentName}
            className="w-8 h-8 rounded-full border-2 border-property-secondary mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Agent Name: {property.agentName}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-property-secondary">
            Price Range: ৳ {property.priceRange}
          </span>
        </div>
        <CustomButton
  text="See Details"
  color="blue"
  onClick={() => navigate(`/property-details/${property._id}`)}
/>
      </div>
    </motion.div>
  );
};

export default PropertyCard;