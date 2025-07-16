import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import CustomButton from "../../../Shared/CustomButton";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Shared/Spinner";

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all offers for this user
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offers", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${user.email}`);
      return res.data;
    },
  });

  const handlePay = (offer) => {
    navigate(`/dashboard/payment/${offer._id}`, { state: { offer } });
  };

  if (isLoading) return Spinner;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">
        My Property Offers
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Agent</th>
              <th className="p-3">Offer Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-8">
                  You have not made any offers yet.
                </td>
              </tr>
            )}
            {offers.map((offer) => (
              <tr
                key={offer._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={offer.propertyImage}
                    alt={offer.propertyTitle}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-semibold">{offer.propertyTitle}</td>
                <td className="p-3">{offer.propertyLocation}</td>
                <td className="p-3">{offer.agentName}</td>
                <td className="p-3 font-bold text-property-secondary">
                  ৳ {offer.offerAmount}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      offer.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : offer.status === "accepted"
                        ? "bg-blue-100 text-blue-700"
                        : offer.status === "bought"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                  >
                    {offer.status.charAt(0).toUpperCase() +
                      offer.status.slice(1)}
                  </span>
                </td>
                <td className="p-3">
                  {offer.status === "accepted" && (
                    <CustomButton
                      text="Pay"
                      color="blue"
                      onClick={() =>
                        navigate(`/dashboard/payment/${offer._id}`, {
                          state: { offer },
                        })
                      }
                      className="w-full"
                    />
                  )}
                  {offer.status === "bought" && offer.transactionId && (
                    <div className="text-green-600 font-semibold text-xs">
                      Paid
                      <br />
                      <span className="font-mono">
                        Txn: {offer.transactionId}
                      </span>
                    </div>
                  )}
                  {offer.status === "pending" && (
                    <span className="text-gray-400 text-xs">
                      Waiting for agent
                    </span>
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

export default PropertyBought;
