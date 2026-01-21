
import React, { useState ,useEffect} from "react";
import authContext from "./authContext";




export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);


useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken && savedUser) {
    setToken(savedToken);
    setUser(JSON.parse(savedUser));
  }
}, []);


  const login = (authToken, userData) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <authContext.Provider value={{ user, token, login, logout }}>
      {children}
    </authContext.Provider>
  );
};




export default AuthState;
