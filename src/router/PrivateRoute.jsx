import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, profile, permission, validateBoth = false }) => {
  const [roles, , , , permissions] = useAuth();

  const hasPrivilege = validateBoth ? 
    roles.includes(profile) && permissions.includes(permission) 
    : 
    roles.includes(profile) || permissions.includes(permission);

  return hasPrivilege ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
