import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface IPrivateRoute {
  children: React.ReactNode,
  role?: string,
  permission?: string,
  validateBoth?: boolean
}

const PrivateRoute = ({ children, role, permission, validateBoth = false }: IPrivateRoute) => {
  const { hasRole, hasPermission, user, loadingUser } = useAuth();

  if (loadingUser) return null;

  if (!role && !permission && user?.roles && user.roles.length >= 1) return children;

  if (!role && permission) return hasPermission(permission) ? children : <Navigate to="/login" />;

  if (!permission && role) return hasRole(role) ? children : <Navigate to="/login" />;

  const hasPrivilege = validateBoth ?
    hasRole(role!) && hasPermission(permission!)
    :
    hasRole(role!) || hasPermission(permission!);

  return hasPrivilege ? children : <Navigate to="/login" />;
};

export { PrivateRoute };