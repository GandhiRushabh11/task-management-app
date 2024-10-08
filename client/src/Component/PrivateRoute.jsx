import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //Fetching token from localStorage
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
