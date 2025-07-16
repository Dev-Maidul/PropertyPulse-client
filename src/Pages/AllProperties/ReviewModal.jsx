import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ReviewModal = ({ propertyId, user, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post('/reviews', {
        propertyId,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        userImage: user.photoURL,
        rating,
        comment,
      });
      toast.success('Review added!');
      await onSuccess(); // Await for refetch before closing modal
    } catch (err) {
      toast.error('Failed to add review');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-property-secondary">Add a Review</h2>
        <div className="flex items-center mb-4">
          {[1,2,3,4,5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer text-2xl ${rating >= num ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(num)}
            />
          ))}
        </div>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded bg-[#1e2939] text-white font-semibold hover:bg-property-primary transition-colors duration-200 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewModal;