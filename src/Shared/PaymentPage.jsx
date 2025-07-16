import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "./Spinner";
import CheckoutForm from "./CheckoutForm"; // import the improved form above

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { offerId } = useParams();
  const location = useLocation();
  const offer = location.state?.offer;

  if (!offer) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} />
      </Elements>
    </div>
  );
};

export default PaymentPage;