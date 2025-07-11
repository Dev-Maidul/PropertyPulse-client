import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom'; 
import Spinner from '../Shared/Spinner'; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); 
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (user) { // Check for user existence after loading is complete
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;