import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
