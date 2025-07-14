import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch property by id
  useEffect(() => {
    axiosSecure.get(`/agent/property/${id}`)
      .then(res => {
        setProperty(res.data);
        setImagePreview(res.data.imageUrl);
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

  // Handle image file change
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProperty(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    let imageUrl = property.imageUrl;

    // If new image selected, upload to imgbb
    if (property.image) {
      const imageData = new FormData();
      imageData.append("image", property.image);
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          { method: "POST", body: imageData }
        );
        const data = await response.json();
        imageUrl = data.data.url;
      } catch {
        toast.error("Image upload failed!");
        return;
      }
    }

    // Prepare update data (exclude agentName/email, keep them as is)
    const updateData = {
      title: property.title,
      location: property.location,
      priceRange: property.priceRange,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
      imageUrl,
    };

    try {
      await axiosSecure.put(`/agent/property/${id}`, updateData);
      toast.success("Property updated!");
      navigate("/dashboard/my-added-properties");
    } catch {
      toast.error("Update failed!");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!property) return <div className="text-center py-10">No property found.</div>;

  return (
    <div className="w-full mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-[#1E3A8A]">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Image */}
        <div>
          <label className="block text-[#1E3A8A]">Property Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input w-full"
            ref={fileInputRef}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full h-100 object-cover rounded"
            />
          )}
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
        {/* Min Price */}
        <div>
          <label className="block text-[#1E3A8A]">Minimum Price</label>
          <input
            type="number"
            name="minPrice"
            value={property.minPrice || ""}
            onChange={handleChange}
            className="input w-full"
          />
        </div>
        {/* Max Price */}
        <div>
          <label className="block text-[#1E3A8A]">Maximum Price</label>
          <input
            type="number"
            name="maxPrice"
            value={property.maxPrice || ""}
            onChange={handleChange}
            className="input w-full"
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