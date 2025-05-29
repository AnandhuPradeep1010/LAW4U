import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // adjust path if needed

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>; // You can style this or add a spinner

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
