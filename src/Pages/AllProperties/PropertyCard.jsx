import React from 'react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property, onDetails }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 
        hover:shadow-lg transition-all duration-300 h-[420px] flex flex-col"
      whileHover={{ scale: 1.03, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 flex-shrink-0">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
            ${property.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
        >
          {property.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{property.title}</h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">Location: {property.location}</p>
        <div className="flex items-center mb-3">
          <img
            src={property.agentImage}
            alt={property.agentName}
            className="w-8 h-8 rounded-full border-2 border-gray-300 mr-2 object-cover"
          />
          <span className="text-sm font-medium text-gray-700 line-clamp-1">
            Agent: {property.agentName}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold text-gray-800">
            ৳ {property.priceRange}
          </span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onDetails(property._id)}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md 
              hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
          >
            See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;