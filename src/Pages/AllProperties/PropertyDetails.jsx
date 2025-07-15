import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import CustomButton from '../../Shared/CustomButton';
import { FaHeart, FaUserCircle, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReviewModal from './ReviewModal'; // We'll create this below
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Spinner from '../../Shared/Spinner';


const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ['property-details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property-details/${id}`);
      return res.data;
    }
  });

  // Fetch reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    }
  });

  // Add to wishlist mutation
  const addToWishlist = useMutation({
    mutationFn: async () => {
      return axiosSecure.post('/wishlist', {
        userEmail: user.email,
        propertyId: id,
      });
    },
    onSuccess: () => {
      toast.success('Added to wishlist!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Already in wishlist!');
    }
  });

  if (isLoading) return Spinner
  if (!property) return <div className="text-center py-20">Property not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full md:w-2/5 h-72 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-property-secondary mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-2">{property.description || "No description provided."}</p>
            <div className="flex items-center mb-2">
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-10 h-10 rounded-full border-2 border-property-secondary mr-2"
              />
              <span className="text-lg font-medium text-gray-700">Agent: {property.agentName}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-lg font-semibold text-property-secondary">
                Price Range: ৳ {property.priceRange}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${property.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
              `}>
                {property.status}
              </span>
            </div>
            <p className="text-gray-500 mb-2">Location: {property.location}</p>
          </div>
          <div className="flex gap-4 mt-4">
            <CustomButton
              text="Add to Wishlist"
              color="red"
              onClick={() => addToWishlist.mutate()}
              icon={<FaHeart className="inline mr-2" />}
            />
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-property-secondary">Reviews</h3>
          <CustomButton
            text="Add a Review"
            color="blue"
            onClick={() => setShowReviewModal(true)}
            icon={<FaStar className="inline mr-2" />}
          />
        </div>
        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="text-gray-500">No reviews yet. Be the first to review!</div>
          )}
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              className="bg-gray-50 rounded-lg p-4 shadow-sm flex items-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={review.userImage || "https://i.ibb.co/2d9dK0F/default-profile.png"}
                alt={review.userName}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{review.userName}</span>
                  <span className="text-yellow-500 flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          propertyId={id}
          user={user}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            setShowReviewModal(false);
            refetchReviews();
          }}
        />
      )}
    </div>
  );
};

export default PropertyDetails;