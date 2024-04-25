import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext ";

const CustomerProtected = ({ children }) => {
  const { userInfo } = useAuth();
  return userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default CustomerProtected;
