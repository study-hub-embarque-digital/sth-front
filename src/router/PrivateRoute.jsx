import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, profile }) => {
  const [roles] = useAuth();
  
  return roles.includes(profile) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
