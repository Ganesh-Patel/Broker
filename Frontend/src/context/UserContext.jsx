
import React, { createContext, useEffect, useState } from 'react';
import {isUserLoggedIn} from '../utils/userApis.js'

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response=await isUserLoggedIn(setIsLoggedIn,setUser);
      console.log(response);
      setLoading(false);
    };
    checkLoginStatus();

  }, []);
  
  console.log(isLoggedIn)
  if (loading) {
    return null;
  }
  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn,loading }}>
      {children}
    </UserContext.Provider>
  );
};
