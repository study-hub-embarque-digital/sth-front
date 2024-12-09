import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    return [[], () => false, () => '/']
  }

  const decodedToken = jwtDecode(token);
  const roles = decodedToken.roles;

  const isAuthenticated = () => {
    return token !== null || token !== undefined;
  }

  const pathForRole = () => {
    if (roles.includes('ALUNO')) return '/student';
    if (roles.includes('MENTOR')) return '/mentor';
    if (roles.includes('REPRESENTANTE')) return '/representative';
  }

  return [roles, isAuthenticated, pathForRole];
};

export {
  useAuth
}