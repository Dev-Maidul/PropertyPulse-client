import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Spinner from "../../Shared/Spinner";
import cover from "../../../src/assets/cover.png";
import { imageUpload } from "../../API/utils";


const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: user?.displayName || "",
    photo: user?.photoURL || "",
  });
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (isRoleLoading) return <Spinner />;

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await imageUpload(file);
      setForm((prev) => ({ ...prev, photo: url }));
    } catch (err) {
      alert("Image upload failed!");
    }
    setUploading(false);
  };

  // Handle form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateUserProfile(form.name, form.photo);
      setIsModalOpen(false);
      window.location.reload(); // To reflect changes immediately
    } catch (err) {
      alert("Failed to update profile");
    }
    setUpdating(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f7fe]">
      <div className="w-full bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-4/5">
        <img
          alt="cover photo"
          src={cover}
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <div className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white shadow-lg"
            />
            {/* Edit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-0 right-0 bg-[#4F46E5] text-white p-2 rounded-full shadow hover:bg-[#6366F1] transition"
              title="Edit Profile"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM5 15a1 1 0 001 1h8a1 1 0 100-2H6a1 1 0 00-1 1z" />
              </svg>
            </button>
          </div>
          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full mt-2">
            {role?.toUpperCase()}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex gap-2">
                Name
                <span className="font-bold text-black ">
                  {user.displayName}
                </span>
              </p>
              <p className="flex gap-2">
                Email
                <span className="font-bold text-black ">{user.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-property-secondary">
              Edit Profile
            </h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {uploading && <div className="text-xs text-blue-500 mt-1">Uploading...</div>}
              {form.photo && (
                <img
                  src={form.photo}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mt-2 mx-auto object-cover border"
                />
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={updating || uploading}
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;