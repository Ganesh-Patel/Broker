
import React, { createContext, useEffect, useState } from 'react';
import {isUserLoggedIn} from '../utils/userApis.js'
import { Puff } from 'react-loader-spinner';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    console.log('UserContext useEffect called');
    checkLoginStatus();

  }, []);
  
  const checkLoginStatus = async () => {
    const response=await isUserLoggedIn(setIsLoggedIn,setUser);
    console.log(response);
    setLoading(false);
  };

  console.log(isLoggedIn)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Puff
        height={80}
        width={80}
        radius={1}
        color="#38b2ac"
        ariaLabel="loading"
        visible={true}
      />
      <h1>Loading....</h1>
    </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn,loading,checkLoginStatus }}>
      {children}
    </UserContext.Provider>
  );
};
