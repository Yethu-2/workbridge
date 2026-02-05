const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const buildHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  ...headers
});

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers)
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export default apiRequest;
