
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import PropertyCard from './PropertyCard';


const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['all-properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties');
      return res.data;
    }
  });

  const handleDetails = (id) => {
    navigate(`/property/${id}`);
  };

  if (isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-property-secondary mb-8 text-center">All Verified Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {properties.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No properties found.</div>
        )}
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} onDetails={handleDetails} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;