import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Shared/Spinner";
import CustomButton from "../../../Shared/CustomButton";

const ReportedProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ["reported-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reports");
      return res.data;
    },
  });

  // Remove property handler
  const handleRemove = async (propertyId) => {
    await axiosSecure.delete(`/admin/remove-property/${propertyId}`);
    refetch();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">
        Reported Properties
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Reporter Name</th>
              <th className="p-3">Reporter Email</th>
              <th className="p-3">Property Title</th>
              <th className="p-3">Agent Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  No reported properties.
                </td>
              </tr>
            )}
            {reports.map((report) => (
              <tr key={report._id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3">{report.reporterName}</td>
                <td className="p-3">{report.reporterEmail}</td>
                <td className="p-3">{report.propertyTitle}</td>
                <td className="p-3">{report.agentName}</td>
                <td className="p-3">{report.description}</td>
                <td className="p-3">
                  <CustomButton
                    text="Remove this property"
                    color="red"
                    onClick={() => handleRemove(report.propertyId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProperties;