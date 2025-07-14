import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MyAddedProperties = () => {
    const {user}=useAuth();
    console.log(user);
    return (
        <div>
            
        </div>
    );
};

export default MyAddedProperties;