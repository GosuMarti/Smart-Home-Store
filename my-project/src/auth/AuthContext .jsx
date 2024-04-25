import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    return expirationTime < new Date();
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      handleLogout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token || isTokenExpired(token)) {
      console.log("No token or token expired.");
      handleLogout();
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/user/${jwtDecode(token).jti}`
        );
        if (!data?.userType) {
          console.log("Incomplete user info.");
          handleLogout();
        } else {
          setUserInfo(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        handleLogout();
        localStorage.removeItem("jwtToken");
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUserInfo(null);
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  const handleLogin = (data, token) => {
    if (
      typeof token === "string" &&
      token.trim() !== "" &&
      !isTokenExpired(token)
    ) {
      localStorage.setItem("jwtToken", token);
      setUserInfo(data);
      setIsAuthenticated(true);
      navigate("/", { replace: true });
    } else {
      console.error("Invalid token", token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        handleLogin,
        userInfo,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
