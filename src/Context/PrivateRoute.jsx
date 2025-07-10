import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../Shared/Spinner';



const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext);

  const location=useLocation();
  // console.log(location);

    if(loading) return <Spinner></Spinner>
  if(user && user.email) return children;
  return <Navigate to='/login' state={{ from: location }} />;
//   return <Navigate state={location.pathname} to='/signin'></Navigate>
};

export default PrivateRoute;
