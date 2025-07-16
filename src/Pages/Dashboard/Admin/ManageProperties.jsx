import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';
import CustomButton from '../../../Shared/CustomButton';
import toast from 'react-hot-toast';

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/properties');
      return res.data;
    }
  });

  // Verify property mutation
  const verifyProperty = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/admin/properties/verify/${id}`);
    },
    onSuccess: () => {
      toast.success('Property verified!');
      queryClient.invalidateQueries(['admin-properties']);
    }
  });

  // Reject property mutation
//   const rejectProperty = useMutation({
//     mutationFn: async (id) => {
//       return axiosSecure.patch(`/admin/properties/reject/${id}`);
//     },
//     onSuccess: () => {
//       toast.error('Property rejected!');
//       queryClient.invalidateQueries(['admin-properties']);
//     }
//   });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">Manage Properties</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Agent Name</th>
              <th className="p-3">Agent Email</th>
              <th className="p-3">Price Range</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-8">
                  No properties found.
                </td>
              </tr>
            )}
            {properties.map(property => (
              <tr key={property._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-semibold">{property.title}</td>
                <td className="p-3">{property.location}</td>
                <td className="p-3">{property.agentName}</td>
                <td className="p-3">{property.agentEmail}</td>
                <td className="p-3">{property.priceRange}</td>
                <td className="p-3">
                  {property.status === "Verified" && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Verified</span>
                  )}
                  {property.status === "Rejected" && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Rejected</span>
                  )}
                  {!property.status || property.status === "Pending" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
                  ) : null}
                </td>
                <td className="p-3">
                  {(!property.status || property.status === "Pending") && (
                    <div className="flex gap-2">
                      <CustomButton
                        text="Verify"
                        color="green"
                        onClick={() => verifyProperty.mutate(property._id)}
                        className="px-4 py-1 text-xs"
                      />
                      <CustomButton
                        text="Reject"
                        color="red"
                        onClick={() => rejectProperty.mutate(property._id)}
                        className="px-4 py-1 text-xs"
                      />
                    </div>
                  )}
                  {property.status === "Verified" && (
                    <span className="text-green-600 font-semibold">Verified</span>
                  )}
                  {property.status === "Rejected" && (
                    <span className="text-red-600 font-semibold">Rejected</span>
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

export default ManageProperties;