import { jwtDecode } from "jwt-decode";
import { TokenHandler } from "../utils/TokenHandler";

const useAuth = () => {
  const token = TokenHandler.accessToken;

  if (!token) {
    return [[], () => false, () => "/"];
  }

  const decodedToken = jwtDecode(token);
  const roles = decodedToken.roles;
  const sub = decodedToken.sub;
  const permissions = decodedToken.permissions;

  const isAuthenticated = () => !!token;
  
  const pathForRole = () => {
    if (roles.includes("ALUNO")) return "/student";
    if (roles.includes("MENTOR")) return "/mentor";
    if (roles.includes("REPRESENTANTE")) return "/representative";
    if (roles.includes("ADMIN")) return "/admin";
  };

  return [roles, isAuthenticated, pathForRole, sub, permissions];
};

export { useAuth };
