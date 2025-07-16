import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaCreditCard } from "react-icons/fa";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1E3A8A",
      fontSize: "18px",
      fontFamily: "inherit",
      "::placeholder": { color: "#94a3b8" },
      iconColor: "#10B981",
    },
    invalid: {
      color: "#e53e3e",
      iconColor: "#e53e3e",
    },
  },
};

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { offerId: offer._id })
      .then(res => setClientSecret(res.data.clientSecret));
  }, [offer, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    await axiosSecure.patch(`/offers/payment/${offer._id}`, {
      transactionId: paymentIntent.id
    });
    toast.success("Payment successful!");
    window.location.href = "/dashboard/property-bought";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6 animate-fade-in"
    >
      <div className="flex items-center gap-3 mb-2">
        <FaCreditCard className="text-2xl text-green-600" />
        <h2 className="text-2xl font-bold text-property-secondary">Pay for Property</h2>
      </div>
      <div className="mb-2">
        <div className="text-lg font-semibold text-gray-700">
          {offer.propertyTitle}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          Location: {offer.propertyLocation}
        </div>
        <div className="text-xl font-bold text-green-600">
          Amount: ৳ {offer.offerAmount}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Card Details</label>
        <div className="bg-gray-50 border-2 border-blue-200 rounded-lg p-3 transition focus-within:border-green-500">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="w-full py-3 rounded-lg bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition cursor-pointer"
      >
        {loading ? "Processing..." : `Pay ৳${offer.offerAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;