import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Spinner from '../../../Shared/Spinner';
import WishlistCard from './WishlistCard';

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch wishlist properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['wishlist', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    }
  });

  // Remove from wishlist mutation
  const removeFromWishlist = useMutation({
    mutationFn: async (property) => {
      return axiosSecure.delete('/wishlist', {
        data: {
          userEmail: user.email,
          propertyId: property._id
        }
      });
    },
    onSuccess: () => {
      toast.success('Removed from wishlist!');
      queryClient.invalidateQueries(['wishlist', user.email]);
    },
    onError: () => {
      toast.error('Failed to remove from wishlist!');
    }
  });

  // Make an offer handler (you can implement modal or redirect)
  const handleOffer = (property) => {
    toast('Make an offer clicked! (Implement your logic here)');
  };

  if (isLoading) return Spinner;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">My Wishlist</h1>
      <div className="flex flex-col gap-8">
        {properties.length === 0 && (
          <div className="text-center text-gray-500">No properties in your wishlist.</div>
        )}
        {properties.map(property => (
          <WishlistCard
            key={property._id}
            property={property}
            onRemove={removeFromWishlist.mutate}
            onOffer={handleOffer}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;