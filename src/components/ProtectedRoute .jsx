import { Navigate } from "react-router-dom";

const getUserRole = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  const user = JSON.parse(token);
  return user.ROLE;
};

export const ProtectedRoute = ({ roleRequired, children }) => {
  const userRole = getUserRole();
  if (userRole !== roleRequired) {
    return <Navigate to="/" replace/>;
  }
  return children;
};
