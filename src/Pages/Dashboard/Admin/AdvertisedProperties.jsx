import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    const res = await axiosSecure.get('/admin/verified-properties');
    setProperties(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  const handleAdvertise = async (id) => {
    await axiosSecure.patch(`/admin/properties/advertise/${id}`);
    fetchProperties(); // Refresh the list
  };

  if (loading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Advertise Property</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price Range</th>
            <th>Agent Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>
                <img src={property.imageUrl} alt={property.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td>{property.title}</td>
              <td>{property.priceRange}</td>
              <td>{property.agentName}</td>
              <td>
                {property.isAdvertised ? (
                  <span className="badge badge-success">Advertised</span>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAdvertise(property._id)}
                  >
                    Advertise
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseProperty;