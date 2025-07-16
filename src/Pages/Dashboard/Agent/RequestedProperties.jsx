import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Spinner from '../../../Shared/Spinner';
import CustomButton from '../../../Shared/CustomButton';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all offers for this agent
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['agent-offers', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/offers/${user.email}`);
      return res.data;
    }
  });

  // Accept offer mutation
  const acceptOffer = useMutation({
    mutationFn: async (offerId) => axiosSecure.patch(`/agent/offers/accept/${offerId}`),
    onSuccess: () => {
      toast.success('Offer accepted!');
      queryClient.invalidateQueries(['agent-offers', user.email]);
    }
  });

  // Reject offer mutation
  const rejectOffer = useMutation({
    mutationFn: async (offerId) => axiosSecure.patch(`/agent/offers/reject/${offerId}`),
    onSuccess: () => {
      toast.error('Offer rejected!');
      queryClient.invalidateQueries(['agent-offers', user.email]);
    }
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">Requested/Offered Properties</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-lg border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3">Buyer Name</th>
              <th className="p-3">Offered Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-8">
                  No offers found.
                </td>
              </tr>
            )}
            {offers.map(offer => (
              <tr key={offer._id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-semibold">{offer.propertyTitle}</td>
                <td className="p-3">{offer.propertyLocation}</td>
                <td className="p-3">{offer.buyerEmail}</td>
                <td className="p-3">{offer.buyerName}</td>
                <td className="p-3 font-bold text-property-secondary">৳ {offer.offerAmount}</td>
                <td className="p-3">
                  {offer.status === "pending" && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
                  )}
                  {offer.status === "accepted" && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Accepted</span>
                  )}
                  {offer.status === "rejected" && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Rejected</span>
                  )}
                </td>
                <td className="p-3">
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <CustomButton
                        text="Accept"
                        color="green"
                        icon={<FaCheck size={14} />}
                        onClick={() => acceptOffer.mutate(offer._id)}
                        className="py-1 px-3 text-xs"
                      />
                      <CustomButton
                        text="Reject"
                        color="red"
                        icon={<FaTimes size={14} />}
                        onClick={() => rejectOffer.mutate(offer._id)}
                        className="py-1 px-3 text-xs md:text-lg"
                      />
                    </div>
                  )}
                  {offer.status !== "pending" && (
                    <span className="text-gray-400 text-xs md:text-lg">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;