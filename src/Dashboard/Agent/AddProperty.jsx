// src/Dashboard/Agent/AddProperty.jsx
import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Ref for file input
  const fileInputRef = useRef(null);

  // Initial form state
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image: null,
    agentName: user?.displayName || "Unknown User",
    agentEmail: user?.email || "unknown@example.com",
    priceRange: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.location || !formData.image || !formData.priceRange) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);

    // Upload image to ImgBB
    const imageData = new FormData();
    imageData.append("image", formData.image);

    let imageUrl = "";
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageData
      );
      imageUrl = response.data.data.url;
    } catch (imgError) {
      console.error(imgError);
      setError("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    // Construct property object to send
    const propertyData = {
      title: formData.title,
      location: formData.location,
      agentName: formData.agentName,
      agentEmail: formData.agentEmail,
      priceRange: formData.priceRange,
      imageUrl,
      status: "Pending", // auto-added
      views: 0,            // auto-added
      postedAt: new Date().toISOString(), // auto-added
    };

    try {
      const response = await axiosSecure.post("/add-property", propertyData);
      if (response.data.acknowledged) {
        toast.success("Property added successfully!");
        setFormData({
          title: "",
          location: "",
          image: null,
          agentName: user?.displayName || "Unknown User",
          agentEmail: user?.email || "unknown@example.com",
          priceRange: "",
        });
        setImagePreview(null);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error(response.data.message || "Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      setError(error?.message || "Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E6F0FA] min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] text-center mb-6">
        Add New Property
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[#1E3A8A]">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter property title"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#1E3A8A]">Property Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-[#1E3A8A]">Property Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input w-full"
              required
              ref={fileInputRef}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Agent Name */}
          <div>
            <label className="block text-[#1E3A8A]">Agent Name</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              readOnly
              className="input w-full bg-gray-100"
            />
          </div>

          {/* Agent Email */}
          <div>
            <label className="block text-[#1E3A8A]">Agent Email</label>
            <input
              type="email"
              name="agentEmail"
              value={formData.agentEmail}
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
              value={formData.priceRange}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g. $50,000 - $100,000"
              required
            />
          </div>

          {/* Error Alert */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn w-full bg-[#10B981] text-white rounded-md text-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;