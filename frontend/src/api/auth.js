import apiRequest from './client';

export const login = async ({ email, password }) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response?.data || null;
};

export const register = async ({ email, password, name, role }) => {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role })
  });
  return response?.data || null;
};
