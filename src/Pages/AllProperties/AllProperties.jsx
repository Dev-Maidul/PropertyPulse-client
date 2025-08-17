import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import PropertyCard from './PropertyCard';

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('');

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const params = { status: 'Verified' }; // Only fetch verified properties
        if (searchInput) params.location = searchInput;
        if (sort) params.sort = sort;
        
        const res = await axiosSecure.get('/properties', { params });
        setProperties(res.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, [searchInput, sort, axiosSecure]); // Changed dependency from 'search' to 'searchInput'

  // Handle sort change
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleDetails = (id) => {
    navigate(`/property-details/${id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Verified Properties
      </h1>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search by location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={sort}
          onChange={handleSort}
          className="select select-bordered w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.length === 0 && !isLoading && (
          <div className="col-span-full text-center text-gray-500">
            No properties found. Try a different search.
          </div>
        )}
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;