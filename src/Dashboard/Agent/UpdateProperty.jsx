import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch property by id
  useEffect(() => {
    axiosSecure.get(`/agent/property/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Property not found!");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  // Handle form change
  const handleChange = e => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/agent/property/${id}`, property);
      toast.success("Property updated!");
      navigate("/dashboard/my-added-properties");
    } catch {
      toast.error("Update failed!");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!property) return <div className="text-center py-10">No property found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#1E3A8A]">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Image (show only, not editable here) */}
        <div>
          <label className="block text-[#1E3A8A]">Property Image</label>
          <img src={property.imageUrl} alt="Property" className="w-full h-40 object-cover rounded" />
        </div>
        {/* Title */}
        <div>
          <label className="block text-[#1E3A8A]">Property Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        {/* Location */}
        <div>
          <label className="block text-[#1E3A8A]">Property Location</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        {/* Agent Name (readonly) */}
        <div>
          <label className="block text-[#1E3A8A]">Agent Name</label>
          <input
            type="text"
            name="agentName"
            value={property.agentName}
            readOnly
            className="input w-full bg-gray-100"
          />
        </div>
        {/* Agent Email (readonly) */}
        <div>
          <label className="block text-[#1E3A8A]">Agent Email</label>
          <input
            type="email"
            name="agentEmail"
            value={property.agentEmail}
            readOnly
            className="input w-full bg-gray-100"
          />
        </div>
        {/* Price Range */}
        <div>
          <label className="block text-[#1E3A8A]">Price Range</label>
          <input
            type="text"
            name="priceRange"
            value={property.priceRange}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn w-full bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;