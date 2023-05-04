import React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_STATES } from "../constants";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";

const ProtectedRoute = ({ children, auth }) => {
  if (auth === AUTH_STATES.ADMIN) {
    return <AdminDashboard />;
  }
  if (auth === AUTH_STATES.LOGGED) {
    return children;
  } else if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

export default ProtectedRoute;
