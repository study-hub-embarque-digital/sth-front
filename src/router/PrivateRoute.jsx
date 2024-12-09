import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children, profile }) => {
  const [roles] = useAuth();
  
  return roles.includes(profile) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
