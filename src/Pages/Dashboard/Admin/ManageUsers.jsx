import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';
import CustomButton from '../../../Shared/CustomButton';
import toast from 'react-hot-toast';
import { FaUserShield, FaUserTie, FaExclamationTriangle, FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/users');
      return res.data;
    }
  });

  // Mutations
  const makeAdmin = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/admin/users/make-admin/${id}`),
    onSuccess: () => {
      toast.success('User is now admin!');
      queryClient.invalidateQueries(['admin-users']);
    }
  });
  const makeAgent = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/admin/users/make-agent/${id}`),
    onSuccess: () => {
      toast.success('User is now agent!');
      queryClient.invalidateQueries(['admin-users']);
    }
  });
  const markFraud = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/admin/users/mark-fraud/${id}`),
    onSuccess: () => {
      toast.error('Agent marked as fraud!');
      queryClient.invalidateQueries(['admin-users']);
    }
  });
  const deleteUser = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/admin/users/${id}`),
    onSuccess: () => {
      toast.success('User deleted!');
      queryClient.invalidateQueries(['admin-users']);
    }
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">
                  No users found.
                </td>
              </tr>
            )}
            {users.map(user => (
              <tr key={user._id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-semibold">{user.name || "N/A"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  {user.isFraud ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Fraud</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
                  )}
                </td>
                <td className="p-3">
                  {user.isFraud ? (
                    <span className="text-red-600 font-semibold">Fraud</span>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      {user.role !== "admin" && (
                        <CustomButton
                          text="Make Admin"
                          color="blue"
                          icon={<FaUserShield className="mr-1" />}
                          onClick={() => makeAdmin.mutate(user._id)}
                          className="py-1 px-3 !text-xs flex items-center gap-1"
                        />
                      )}
                      {user.role !== "agent" && (
                        <CustomButton
                          text="Make Agent"
                          color="green"
                          icon={<FaUserTie className="mr-1" />}
                          onClick={() => makeAgent.mutate(user._id)}
                          className="py-1 px-3 text-sm md:text-lg flex items-center gap-1"
                        />
                      )}
                      {user.role === "agent" && (
                        <CustomButton
                          text="Make Fraud"
                          color="yellow"
                          icon={<FaExclamationTriangle className="mr-1" />}
                          onClick={() => markFraud.mutate(user._id)}
                          className="py-1 px-3 text-sm md:text-lg flex items-center gap-1"
                        />
                      )}
                      <CustomButton
                        text="Delete"
                        color="red"
                        icon={<FaTrash className="mr-1" />}
                        onClick={() => deleteUser.mutate(user._id)}
                        className="py-1 px-2 text-sm md:text-lg flex items-center gap-1"
                      />
                    </div>
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

export default ManageUsers;