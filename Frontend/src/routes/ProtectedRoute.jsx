import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { Puff } from 'react-loader-spinner';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="spinner-container">
        <Puff
          height={100}
          width={100}
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          visible={true}
        />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
