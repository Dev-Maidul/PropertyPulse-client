import React from 'react';
import { FaTrash, FaHandshake } from 'react-icons/fa';
import CustomButton from '../../../Shared/CustomButton';

const WishlistCard = ({ property, onRemove, onOffer }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="md:w-1/3 w-full h-64 md:h-auto flex items-center justify-center bg-gray-50">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Details */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-property-secondary mb-1">{property.title}</h2>
          <p className="text-gray-500 mb-2">Location: {property.location}</p>
          <div className="flex items-center mb-2">
            <img
              src={property.agentImage}
              alt={property.agentName}
              className="w-8 h-8 rounded-full border-2 border-property-secondary mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Agent: {property.agentName}</span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-semibold text-property-secondary">
              ৳ {property.priceRange}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold
              ${property.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
            `}>
              {property.status}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <CustomButton
            text="Make an Offer"
            color="blue"
            icon={<FaHandshake className="inline mr-2" />}
            onClick={() => onOffer(property)}
            className="flex-1"
          />
          <CustomButton
            text="Remove"
            color="red"
            icon={<FaTrash className="inline mr-2" />}
            onClick={() => onRemove(property)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;