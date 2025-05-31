import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { TokenHandler } from "../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  loadingUser: boolean,
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  logout: () => void;
}

interface IAuthProvider {
  children?: React.ReactNode;
}

interface IUser {
  name: string;
  email?: string;
  permissions: Array<string>;
  roles: Array<string>;
  sub: string;
}

interface IAccessToken {
  name: string;
  email?: string;
  permissions: Array<string>;
  roles: Array<string>;
  sub: string;
  exp: number;
  iss: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    verifyIsAuthenticatedUser();
  }, [location.pathname]);

  const verifyIsAuthenticatedUser = () => {
    const token: string | null = TokenHandler.accessToken;

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoadingUser(false);
      return;
    }

    const decodedToken: IAccessToken = jwtDecode(token);

    setUser({
      email: decodedToken.email,
      name: decodedToken.name,
      permissions: decodedToken.permissions,
      roles: decodedToken.roles,
      sub: decodedToken.sub
    });

    setIsAuthenticated(true);
    setLoadingUser(false);
  };

  const hasRole = useMemo(
    () => (role: string) => user?.roles.includes(role) ?? false,
    [user]
  );

  const hasAnyRole = useMemo(
    () => (roles: string[]) => roles.some(role => user?.roles.includes(role)),
    [user]
  );

  const hasPermission = useMemo(
    () => (permission: string) => user?.permissions.includes(permission) ?? false,
    [user]
  );

  const hasAnyPermission = useMemo(
    () => (permissions: string[]) => permissions.some(permission => user?.permissions.includes(permission)),
    [user]
  );

  const logout = () => {
    TokenHandler.removeTokens();
    setIsAuthenticated(false);
    navigate('/login');
  }

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    loadingUser,
    user,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
    logout
  }), [isAuthenticated, user, loadingUser, hasRole, hasAnyRole, hasPermission, hasAnyPermission]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
