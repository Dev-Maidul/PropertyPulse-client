// src/Dashboard/Agent/AddProperty.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const AddProperty = () => {
  const { user, role } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    photoURL: "",
    status: "available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!["agent", "admin"].includes(role)) {
      alert("You do not have permission to add properties!");
      return;
    }
    try {
      const token = localStorage.getItem("token"); // Adjust based on your auth flow
      const response = await fetch("http://localhost:5000/api/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Property added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          photoURL: "",
          status: "available",
        });
      } else {
        throw new Error(data.message || "Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-property-bg min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-property-text text-center mb-6">
        Add New Property
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-property-text text-sm md:text-base">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary"
              placeholder="Property Title"
              required
            />
          </div>
          <div>
            <label className="block text-property-text text-sm md:text-base">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary h-24"
              placeholder="Property Description"
              required
            />
          </div>
          <div>
            <label className="block text-property-text text-sm md:text-base">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary"
              placeholder="Price (e.g., 50000)"
              required
            />
          </div>
          <div>
            <label className="block text-property-text text-sm md:text-base">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary"
              placeholder="Location"
              required
            />
          </div>
          <div>
            <label className="block text-property-text text-sm md:text-base">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary"
              placeholder="Photo URL"
              required
            />
          </div>
          <div>
            <label className="block text-property-text text-sm md:text-base">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input w-full bg-gray-50 border-gray-300 rounded-md focus:border-property-secondary focus:ring-property-secondary"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn w-full bg-black text-white hover:bg-opacity-80 rounded-md text-lg transition-colors duration-300"
            // disabled={!["agent", "admin"].includes(role)}
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;