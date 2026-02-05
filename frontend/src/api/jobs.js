import apiRequest from './client';

const toQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === 'all') return;
    searchParams.append(key, value);
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const fetchJobs = async (filters = {}) => {
  const response = await apiRequest(`/jobs${toQueryString(filters)}`);
  return response?.data?.jobs || [];
};

export const fetchFeaturedJobs = async () => {
  const response = await apiRequest('/jobs/featured');
  return response?.data?.jobs || [];
};

export const fetchJobById = async (jobId) => {
  const response = await apiRequest(`/jobs/${jobId}`);
  return response?.data?.job || null;
};
