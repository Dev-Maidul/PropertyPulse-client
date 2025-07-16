import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaHome, FaUserTie } from "react-icons/fa";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Spinner from '../../../Shared/Spinner';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all reviews by this user
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['my-reviews', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      return res.data;
    }
  });

  // Delete review mutation
  const deleteReview = useMutation({
    mutationFn: async (reviewId) => axiosSecure.delete(`/my-reviews/${reviewId}`),
    onSuccess: () => {
      toast.success('Review deleted!');
      queryClient.invalidateQueries(['my-reviews', user.email]);
    }
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">My Reviews</h1>
      <div className="space-y-6">
        <AnimatePresence>
          {reviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center text-gray-500"
            >
              You have not given any reviews yet.
            </motion.div>
          )}
          {reviews.map(review => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              layout
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 text-lg font-bold text-property-secondary">
                    <FaHome className="text-blue-400" />
                    {review.propertyTitle}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 ml-0 sm:ml-4">
                    <FaUserTie className="text-green-500" />
                    <span className="font-semibold">{review.agentName}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(review.createdAt).toLocaleString()}
                </div>
                <div className="text-gray-700 text-base mb-2">{review.comment}</div>
              </div>
              <button
                onClick={() => deleteReview.mutate(review._id)}
                className="flex items-center gap-2 px-5 py-2 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition cursor-pointer shadow-sm"
                title="Delete Review"
              >
                <FaTrash /> Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyReviews;