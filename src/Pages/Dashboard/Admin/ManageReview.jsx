import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaUserCircle } from "react-icons/fa";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';

const ManageReview = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/reviews');
      return res.data;
    }
  });

  // Delete review mutation
  const deleteReview = useMutation({
    mutationFn: async (reviewId) => axiosSecure.delete(`/admin/reviews/${reviewId}`),
    onSuccess: () => {
      toast.success('Review deleted!');
      queryClient.invalidateQueries(['admin-reviews']);
    }
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">Manage Reviews</h1>
      <div className="space-y-6">
        <AnimatePresence>
          {reviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center text-gray-500"
            >
              No reviews found.
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
              <div className="flex items-center gap-3">
                <img
                  src={review.userImage || "https://i.ibb.co/2d9dK0F/default-profile.png"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <div className="font-bold text-property-secondary">{review.userName}</div>
                  <div className="text-xs text-gray-500">{review.userEmail}</div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="text-gray-700 text-base mb-2">{review.comment}</div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(review.createdAt).toLocaleString()}
                </div>
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

export default ManageReview;