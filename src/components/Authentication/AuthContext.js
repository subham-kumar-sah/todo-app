// src/components/Authentication/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { users } from "../MockUserData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (userData) => {
    // Mock authentication logic
    console.log(userData);
    const foundUser = users.filter((u) => {
      return (
        u.userName === userData.username && u.password === userData.password
      );
    });
    if (foundUser.length) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      alert("Invalid User");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    //localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
