import React, { useState } from "react";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ReportModal = ({ property, user, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosSecure.post("/reports", {
        propertyId: property._id,
        propertyTitle: property.title,
        agentName: property.agentName,
        reporterName: user.displayName,
        reporterEmail: user.email,
        description,
      });
      toast.success("Report submitted!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit report");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          title="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-property-secondary">
          Report this Property
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Your Name</label>
          <input
            type="text"
            value={user.displayName}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Your Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
            rows={4}
            placeholder="Describe the issue..."
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Reporting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportModal;