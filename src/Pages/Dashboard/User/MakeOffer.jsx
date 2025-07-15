import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../../Shared/Spinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import CustomButton from '../../../Shared/CustomButton';

const MakeOffer = () => {
  const { propertyId } = useParams();
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState(state?.property || null);
  const [offerAmount, setOfferAmount] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch property if not in state (e.g. on page refresh)
  useEffect(() => {
    if (!property) {
      axiosSecure.get(`/property-details/${propertyId}`)
        .then(res => setProperty(res.data))
        .catch(() => toast.error('Failed to load property info'));
    }
  }, [property, propertyId, axiosSecure]);

  if (!property) return <Spinner />;

  const [min, max] = property.priceRange.split('-').map(Number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (offerAmount < min || offerAmount > max) {
      setErrorMsg(`Offer must be between ${min} and ${max}`);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosSecure.post('/offers', {
        propertyId,
        offerAmount: Number(offerAmount),
        buyerEmail: user.email,
        buyerName: user.displayName,
        buyingDate,
      });
      if (res.data.acknowledged) {
        toast.success('Offer submitted!');
        navigate('/dashboard/property-bought');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to make offer');
    }
    setLoading(false);
  };

  return (
    <div className="w-full mx-auto px-2 sm:px-6 py-10 min-h-screen flex items-center">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full overflow-hidden">
        {/* Property Image and Info */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-gray-50 p-6">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="object-cover w-full h-120 rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-property-secondary mb-1">{property.title}</h2>
          <p className="text-gray-500 mb-1">Location: {property.location}</p>
          <div className="flex items-center mb-1">
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
        {/* Offer Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-property-secondary">Make an Offer</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1">
            <div>
              <label className="block font-semibold mb-1">Property Title</label>
              <input type="text" value={property.title} readOnly className="input input-bordered w-full bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input type="text" value={property.location} readOnly className="input input-bordered w-full bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Agent Name</label>
              <input type="text" value={property.agentName} readOnly className="input input-bordered w-full bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Offer Amount (৳)</label>
              <input
                type="number"
                value={offerAmount}
                onChange={e => setOfferAmount(e.target.value)}
                min={min}
                max={max}
                required
                className="input input-bordered w-full"
                placeholder={`Between ${min} and ${max}`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Your Email</label>
              <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Your Name</label>
              <input type="text" value={user.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Buying Date</label>
              <input
                type="date"
                value={buyingDate}
                onChange={e => setBuyingDate(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
            {errorMsg && <div className="text-red-500 font-semibold">{errorMsg}</div>}
            <div className="flex-1 items-center text-center"></div>
            <CustomButton
              text={loading ? "Submitting..." : "Submit Offer"}
              color="gray"
              type="submit"
              className=" py-3 text-xl font-bold mt-2 text-center"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;